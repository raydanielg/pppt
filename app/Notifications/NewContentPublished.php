<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContentPublished extends Notification
{
    use Queueable;

    protected $content;
    protected $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($content, $type)
    {
        $this->content = $content;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = route($this->type . '.show', $this->content->slug ?? $this->content->id);

        return (new MailMessage)
            ->subject('New Content on PhysioPlanet: ' . $this->content->title)
            ->greeting('Hello!')
            ->line('We have just published a new ' . str_replace('-', ' ', $this->type) . '.')
            ->line('**' . $this->content->title . '**')
            ->action('Read More', $url)
            ->line('Thank you for subscribing to PhysioPlanet!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
