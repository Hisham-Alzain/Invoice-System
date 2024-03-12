<x-guest-layout>
    <x-authentication-card>
        <x-slot name="logo">
            <x-authentication-card-logo />
        </x-slot>
        <form method="POST" action="{{ route('password.reset') }}">
        <!-- Form content -->
        </form>
    </x-authentication-card>
</x-guest-layout>
