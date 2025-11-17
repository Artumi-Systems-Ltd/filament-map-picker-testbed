<div>

    <p> This page lets us test having the form as a more normal style of form and not using the livewire
    call backs and just doing a form submission to see what happens.</p>
    <form action="/map-submission-search-results" method="get">
        {{ $this->form }}

        <button type="submit" class="bg-lime-400 my-3 border-lime-900 border-b p-3 ">
            Submit
        </button>
    </form>

    <x-filament-actions::modals />
</div>
