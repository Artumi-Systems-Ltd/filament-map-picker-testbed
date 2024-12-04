<div>
    <form wire:submit="create">
    <p>Tests:</p>
    <ul class="ml-3 list-disc">
    <li>Check that there are no console errors.</li>
    <li>Check that selecting a point and then navigating back and forth maintains that point</li>
    </ul>

        {{ $this->form }}

        <button type="submit" class="bg-lime-400 my-3 border-lime-900 border-b p-3 ">
            Submit
        </button>
    </form>

    <x-filament-actions::modals />
</div>
