<?php

namespace App\Filament\Resources\Places\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Resources\Places\PlaceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPlaces extends ListRecords
{
    protected static string $resource = PlaceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
