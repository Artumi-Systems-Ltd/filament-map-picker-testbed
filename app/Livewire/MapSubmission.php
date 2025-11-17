<?php

namespace App\Livewire;

use Filament\Actions\Contracts\HasActions;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Schemas\Schema;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Dotswan\MapPicker\Fields\Map;
use Filament\Forms\Components\Select;
use Livewire\Component;
use Illuminate\Contracts\View\View;

class MapSubmission extends Component implements HasForms, HasActions
{
    use InteractsWithActions;
    use InteractsWithForms;

    public ?array $data = [];

    public function mount()
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
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
                ->extraInputAttributes(['name' => 'search_distance'])
                ->required(),
        ])->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        //
    }

    public function render(): View
    {
        return view('livewire.map-submission');
    }
}

