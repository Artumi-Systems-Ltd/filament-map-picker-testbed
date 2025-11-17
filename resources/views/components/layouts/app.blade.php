<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BG321QSYB4"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BG321QSYB4');
        </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }} - @yield('title')</title>
        <link type="text/css" rel="stylesheet" href="/css/app.css" >
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />
        <style>
        #menu-toggle:checked + #menu {
            display: block;
        }
        </style>
            <!-- Vite CSS -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @filamentStyles
    </head>
    <body>
        <div class="bg-zinc-100">
            <div class="max-w-screen-xl mx-auto sm:py-3 min-h-80">
                <div class="flex">
                    @if ($image ?? '')
                    <div class="mb-6">
                        {{ $image ?? '' }}
                    </div>
                    @endif
                    <header class="px-3 text-center"><h1 class="py-6">@yield('title')</h1></header>
                </div>

                <main class="px-3">
                    @session('success-message')
                    <div class="p-4 bg-green-100">
                        {{ $value }}
                    </div>
                    @endsession
                    @session('error-message')
                    <div class="p-4 bg-red-100">
                        {{ $value }}
                    </div>
                    @endsession
                    {{ $slot }}
                </main>
            </div>
        </div>
        @filamentScripts
    </body>
</html>
