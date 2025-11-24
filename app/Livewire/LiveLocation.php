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

class LiveLocation extends Component implements HasSchemas, HasActions
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

                Map::make('point_selection')
                    ->label('Point Selection')
                    ->extraStyles([
                        'height:50vh',
                    ])
                    ->setBoundsToBritishIsles()
                    ->showMarker(true)
                    ->liveLocation()
                    ->showFullscreenControl(false)
                    ->showZoomControl()
                    ->tilesUrl("https://tile.openstreetmap.org/{z}/{x}/{y}.png")
                    ->minZoom(7)
                    ->maxZoom(19)
                    ->clickable(true)
                    ->detectRetina()
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

    public function refresh(): void
    {
        dd('Refresh received', $this->form->getState());
    }
    public function test(): void
    {
        dd($this->form->getState());
    }

    public function render()
    {
        return view('livewire.live-location');
    }
}
