<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title'       => $this->faker->sentence(3),
            'description' => $this->faker->optional()->sentence(8),
            'status'      => 'pending',
            'due_date'    => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
            'is_public'   => $this->faker->boolean(30),
        ];
    }
}
