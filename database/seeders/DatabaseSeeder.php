<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Place;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        if (!app()->environment('production')) {
            User::factory()->create([
                'name' => env('DEV_LOGIN_NAME'),
                'email' => env('DEV_LOGIN_EMAIL'),
                'password' => env('DEV_LOGIN_PASSWORD')
            ]);
            Place::factory()->create([
                'title' => 'Spanish Places',
                'location' => '{"lat":40.404640507926196,"lng":-3.690547943115235}',
                'distance1' => 10000,
                'location2' => '{"lat":43.37091994324677,"lng":-8.413996696908727}',
                'location3' => '{"lat":43.48562169902198,"lng":-3.779211044311524}',
                'distance3' => 1000,
            ]);
        }
    }
}
