<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlaceResource\Pages;
use App\Filament\Resources\PlaceResource\RelationManagers;
use App\Models\Place;
use Dotswan\MapPicker\Fields\Map;
use Filament\Forms;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlaceResource extends Resource
{
    protected static ?string $model = Place::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title'),
                Group::make(function () {
                    return [
                        Map::make('location')

                            ->label('Location - Range Select')
                            ->defaultLocation(latitude: 40.4168, longitude: -3.7038)
                            ->zoom(15)
                            ->afterStateUpdated(function (Set $set, $state): void {
                                if (isset($state['lat']) && isset($state['lng'])) {
                                    $set('location', json_encode(['lat' => $state['lat'], 'lng' => $state['lng']]));
                                }
                            })
                            ->afterStateHydrated(function ($state, $record, Set $set): void {
                                if ($record !== null) {
                                    // Correctly set location, latitude, and longitude from record
                                    $a = json_decode($record->location);
                                    $set('location', [
                                        'lat'     => $a->lat,
                                        'lng'     => $a->lng
                                    ]);
                                } else {
                                    $set('location', null); // Or any default value
                                }
                            })
                            ->rangeSelectField('distance1')
                            ->showMarker(true)
                            ->markerColor("#22c55eff"),

                        Select::make('distance1')
                            ->options([10 => 10, 100 => 100, 1000 => 1000, 10000 => 10000, 100000 => 100000]),
                    ];
                }),
                Group::make(function () {
                    return [
                        Map::make('location2')
                            ->label('Location 2 - clickable - no range select')
                            ->clickable(true)
                            ->zoom(6)
                            ->showMarker(true)
                            ->defaultLocation(latitude: 42.4168, longitude: -1.7038)
                            ->afterStateUpdated(function (Set $set,  $state): void {
                                if (isset($state['lat']) && isset($state['lng'])) {
                                    $set('location2', json_encode(['lat' => $state['lat'], 'lng' => $state['lng']]));
                                }
                            })
                            ->afterStateHydrated(function ($state, $record, Set $set): void {
                                if ($record !== null) {
                                    // Correctly set location, latitude, and longitude from record
                                    $a = json_decode($record->location2);
                                    $set('location2', [
                                        'lat'     => $a->lat,
                                        'lng'     => $a->lng,
                                    ]);
                                } else {
                                    $set('location2', null); // Or any default value
                                }
                            })
                            ->markerColor("#22c55eff")
                    ];
                }),

                Group::make(function () {
                    return [
                        Map::make('location3')
                            ->label('Location 3 - not clickable - range select')
                            ->showMarker(true)
                            ->defaultLocation(latitude: 42.4168, longitude: -1.7038)
                            ->rangeSelectField('distance3')
                            ->zoom(19)
                            ->afterStateUpdated(function (Set $set,  $state): void {
                                if (isset($state['lat']) && isset($state['lng'])) {
                                    $set('location3', json_encode(['lat' => $state['lat'], 'lng' => $state['lng']]));
                                }
                            })
                            ->afterStateHydrated(function ($state, $record, Set $set): void {
                                if ($record !== null) {
                                    $a = json_decode($record->location3);
                                    $set('location3', [
                                        'lat'     => $a->lat,
                                        'lng'     => $a->lng,
                                    ]);
                                } else {
                                    $set('location3', null); // Or any default value
                                }
                            })
                            ->markerColor("#22c55eff"),

                        Select::make('distance3')
                            ->options([10 => 10, 100 => 100, 1000 => 1000, 10000 => 10000, 100000 => 100000]),
                    ];
                }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPlaces::route('/'),
            'create' => Pages\CreatePlace::route('/create'),
            'edit' => Pages\EditPlace::route('/{record}/edit'),
        ];
    }
}
