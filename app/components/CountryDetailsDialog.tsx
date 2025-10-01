"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Country } from "../types/country";

interface CountryDetailsDialogProps {
    country: Country | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CountryDetailsDialog({
    country,
    open,
    onOpenChange,
}: CountryDetailsDialogProps) {
    if (!country) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detalles del país</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Bandera */}
                    <div className="w-full h-48 rounded-lg overflow-hidden border shadow-md">
                        <img
                            src={country.flags?.svg ?? ""}
                            alt={`Bandera de ${country.name?.common ?? "país"}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-3">
                        {/* Nombre común */}
                        <div className="p-4 rounded-lg bg-muted/30 border">
                            <p className="text-muted-foreground mb-1">Nombre común</p>
                            <p>{country.name?.common ?? "Desconocido"}</p>
                        </div>

                        {/* Nombre oficial */}
                        <div className="p-4 rounded-lg bg-muted/30 border">
                            <p className="text-muted-foreground mb-1">Nombre oficial</p>
                            <p>{country.name?.official ?? "No disponible"}</p>
                        </div>

                        {/* Región */}
                        <div className="p-4 rounded-lg bg-muted/30 border">
                            <p className="text-muted-foreground mb-1">Región</p>
                            <p>{country.region ?? "No especificada"}</p>
                        </div>

                        {/* Capital */}
                        {country.capital && country.capital.length > 0 && (
                            <div className="p-4 rounded-lg bg-muted/30 border">
                                <p className="text-muted-foreground mb-1">Capital</p>
                                <p>{country.capital[0]}</p>
                            </div>
                        )}


                        {/* Población */}
                        <div className="p-4 rounded-lg bg-muted/30 border">
                            <p className="text-muted-foreground mb-1">Población</p>
                            <p>
                                {new Intl.NumberFormat("es-ES").format(
                                    country.population ?? 0
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
