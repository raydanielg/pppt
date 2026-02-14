<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $query = User::query()->with('roles')->orderByDesc('created_at');

        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('name', 'like', '%'.$q.'%')
                    ->orWhere('email', 'like', '%'.$q.'%')
                    ->orWhere('membership_number', 'like', '%'.$q.'%')
                    ->orWhere('country', 'like', '%'.$q.'%');
            });
        }

        $paginated = $query->paginate(15)->withQueryString();
        $paginated->getCollection()->transform(function (User $u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'country' => $u->country,
                'membership_number' => $u->membership_number,
                'roles' => $u->roles->pluck('name')->values(),
            ];
        });

        return Inertia::render('Admin/Users/Index', [
            'filters' => [
                'q' => $q,
            ],
            'users' => $paginated,
        ]);
    }

    public function edit(User $user): Response
    {
        $roles = Role::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'country' => $user->country,
                'membership_number' => $user->membership_number,
                'onboarding_completed' => (bool) $user->onboarding_completed,
                'roles' => $user->roles->pluck('name')->values(),
            ],
            'allRoles' => $roles,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'country' => ['nullable', 'string', 'max:255'],
            'membership_number' => ['nullable', 'string', 'max:255'],
            'onboarding_completed' => ['nullable', 'boolean'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'max:255'],
            'password' => ['nullable', 'string', 'min:8', 'max:255'],
        ]);

        $user->forceFill([
            'name' => $data['name'],
            'email' => $data['email'],
            'country' => $data['country'] ?? null,
            'membership_number' => $data['membership_number'] ?? null,
            'onboarding_completed' => (bool) ($data['onboarding_completed'] ?? false),
        ]);

        if (! empty($data['password'] ?? null)) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        $roleNames = collect($data['roles'] ?? [])
            ->map(fn ($r) => trim((string) $r))
            ->filter()
            ->values()
            ->all();

        $user->syncRoles($roleNames);

        return redirect()->route('admin.users.index')->with('success', 'User updated.');
    }
}
