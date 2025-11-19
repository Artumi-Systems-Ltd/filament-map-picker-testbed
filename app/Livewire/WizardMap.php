<?php

namespace App\Livewire;

use Dotswan\MapPicker\Fields\Map;
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

class WizardMap extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Introduction')->schema(
                        [
                            FilamentView::make('wizard-map.info'),

                        ]
                    ),
                    Step::make('Map')->schema([

                        Select::make('search_distance')
                            ->label('Search distance')
                            ->belowContent('As this changes, the map should update')
                            ->options([10 => 10, 100 => 100, 1000 => 1000, 10000 => 10000, 100000 => 100000])
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
                            ->setFilledColor('#cad9ec'),

                    ])
                ])
                    ->submitAction(
                        new HtmlString(Blade::render(<<<BLADE
    <x-filament::button
        type="submit"
        size="sm"
    >
    Submit
    </x-filament::button>
BLADE))

                    )
            ])
            ->statePath('data');
    }

    public function create(): void
    {
        dd($this->form->getState());
    }

    public function render()
    {
        return view('livewire.wizard-map');
    }
}
