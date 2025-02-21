<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default statistics similar to the ones in the image
        $statistics = [
            [
                'title' => 'Users',
                'value' => '10K+',
                'icon' => 'fas fa-users',
                'color' => 'bg-light-danger',
                'status' => 'active',
            ],
            [
                'title' => 'Employees',
                'value' => '30+',
                'icon' => 'fas fa-briefcase',
                'color' => 'bg-light-success',
                'status' => 'active',
            ],
            [
                'title' => 'Courses',
                'value' => '80+',
                'icon' => 'fas fa-graduation-cap',
                'color' => 'bg-light-warning',
                'status' => 'active',
            ],
            [
                'title' => 'Students',
                'value' => '6K+',
                'icon' => 'fas fa-user-graduate',
                'color' => 'bg-light-info',
                'status' => 'active',
            ],
        ];

        foreach ($statistics as $statistic) {
            Statistic::create($statistic);
        }
    }
}