<?php

namespace App\Livewire;

use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Livewire\Component;
use Filament\Forms\Form;
use Dotswan\MapPicker\Fields\Map;
use Filament\Forms\Components\Select;
use Illuminate\Contracts\View\View;

class FindByLocation extends Component implements HasForms
{
    use InteractsWithForms;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            Map::make('point_selection')
                ->label('Point Selection')
                ->extraStyles([
                    'height:50vh',
                ])
                ->setBoundsToBritishIsles()
                ->showMarker(true)
                ->showFullscreenControl(false)
                ->showZoomControl()
                ->tilesUrl("https://tile.openstreetmap.de/{z}/{x}/{y}.png")
                ->minZoom(7)
                ->maxZoom(19)
                ->clickable(true)
                ->detectRetina()
                ->rangeSelectField('search_distance')
                ->showMyLocationButton(false)
                ->drawCircleMarker()
                ->dragMode(false)
                ->setFilledColor('#cad9ec'),

            Select::make('search_distance')
                ->label('Search distance')
                ->options([10 => 10, 100 => 100, 1000 => 1000, 10000 => 10000, 100000 => 100000])
                ->required(),
        ])->statePath('data');
    }
    public function create(): void
    {
        dd($this->form->getState());
    }
    public function render(): View
    {
        return view('livewire.find-by-location');
    }
}
