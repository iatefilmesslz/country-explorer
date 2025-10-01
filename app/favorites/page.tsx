// app/favorites/page.tsx
import React from "react";
import FavoritesList from "../components/FavoritesList";

export default function FavoritesPage() {
    return (
        <div className="p-6">
            <FavoritesList />
        </div>
    );
}
