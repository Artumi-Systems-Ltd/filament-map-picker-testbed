<?php

namespace App\Livewire;

use Dotswan\MapPicker\Fields\Map;
use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Illuminate\Contracts\View\View;
use Filament\Schemas\Components\View as FilamentView;
use Filament\Schemas\Schema;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\HtmlString;
use Livewire\Component;

class LocationActions extends Component implements HasSchemas, HasActions
{
    use InteractsWithSchemas;
    use InteractsWithActions;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        $aSheffieldLatLng = ['lat' => 53.3811, 'lng' => -1.4701];
        $aLiverpoolLatLng = ['lat' => 53.4084, 'lng' => -2.9916];

        return $schema
            ->components([
                Action::make('Set to Location to Sheffield')
                    ->action(function () use ($aSheffieldLatLng) {
                        // Update the 'Name' field in the form state
                        $this->form->fill([
                            ...$this->form->getState(),
                            'location_selected' => 'Sheffield',
                            'point_selection' => $aSheffieldLatLng,
                            'select_location' => null,
                        ]);
                    })
                    ->button()
                    ->submit(false),

                Action::make('Set to Location to Liverpool')
                    ->action(function () use ($aLiverpoolLatLng) {
                        // Update the 'Name' field in the form state
                        $this->form->fill([
                            ...$this->form->getState(),
                            'location_selected' => 'Liverpool',
                            'point_selection' => $aLiverpoolLatLng,
                            'select_location' => null,
                        ]);
                    })
                    ->button()
                    ->submit(false),

                Action::make('Clear location')
                    ->action(function () use ($aLiverpoolLatLng) {
                        // Update the 'Name' field in the form state
                        $this->form->fill([
                            ...$this->form->getState(),
                            'location_selected' => '',
                            'point_selection' => null,
                            'select_location' => null,
                        ]);
                    })
                    ->button()
                    ->submit(false),
                Select::make('select_location')
                    ->options([
                        'manchester' => 'Manchester',
                        'london' => 'London',

                    ])
                    ->afterStateUpdated(function (Set $set, $state): void {
                        if ($state == 'manchester') {
                            $set('point_selection', ['lat' => 53.4808, 'lng' => -2.2426]);
                            $set('location_selected', 'Manchester');
                        } else if ($state == 'london') {
                            $set('point_selection', ['lat' => 51.5074, 'lng' => -0.1278]);
                            $set('location_selected', 'London');
                        }
                    })
                    ->live(),
                TextInput::make('location_selected')
                    ->readOnly(),

                Select::make('search_distance')
                    ->label('Search distance')
                    ->belowContent('As this changes, the map should update')
                    ->options([10 => 10, 100 => 100, 1000 => 1000, 10000 => 10000, 100000 => 100000])
                    ->default(10000)
                    ->extraInputAttributes(['name' => 'search_distance'])
                    ->required(),
                Map::make('point_selection')
                    ->label('Point Selection')
                    ->extraStyles([
                        'height:50vh',
                    ])
                    ->setBoundsToBritishIsles()
                    ->showMarker(true)
                    ->showFullscreenControl(false)
                    ->showZoomControl()
                    ->tilesUrl("https://tile.openstreetmap.org/{z}/{x}/{y}.png")
                    ->minZoom(7)
                    ->maxZoom(19)
                    ->clickable(true)
                    ->detectRetina()
                    ->rangeSelectField('search_distance')
                    ->showMyLocationButton(false)
                    ->drawCircleMarker()
                    ->dragMode(false)

                    ->afterStateUpdated(function (Set $set, $state): void {
                        $set('location_selected', '');
                    })
                    ->setFilledColor('#cad9ec'),

                Action::make('Submit')
                    ->action(function () {
                        dd($this->form->getState());
                    }),


            ])
            ->statePath('data');
    }

    public function test(): void
    {
        dd($this->form->getState());
    }

    public function render()
    {
        return view('livewire.location-actions');
    }
}
