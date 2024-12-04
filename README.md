# Filament Map Picker Testbed

This Laravel site is created solely for the purpose of testing the
[Filament Map Picker](https://github.com/dotswan/filament-map-picker) custom field for
Filament.

It has a single Model "Places" and is tested on sqlite saving lat and lng info as json in a text field.

## Setup

- Clone the repo
- `composer install`
- Create the .env adding DEV_LOGIN_NAME, DEV_LOGIN_USER, and DEV_LOGIN_PASSWORD to get an account to login to .
- `php artisan migrate:fresh --seed`

## Usage

Get the version of the map you want in vendor/dotswan/filament-map-picker and `php artisan filament:assets` to get
the correct assets in place and then test locally.


