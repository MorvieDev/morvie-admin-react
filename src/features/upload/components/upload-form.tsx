import React, {useMemo, useState} from "react";
import {countriesList} from "@/shared/constants/countries";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {categoriesList} from "@/shared/constants/categories";
import {Button} from "@/components/ui/button";
import {genresList} from "@/shared/constants/genres";
import {Upload} from "lucide-react";

export default function UploadForm() {

    const years = Array.from({ length: 2100 - 1900 + 1 }, (_, i) => (1900 + i).toString());

    const [title, setTitle] = useState("")
    const [releaseYear, setReleaseYear] = useState("2025")
    const [durationMinutes, setDurationMinutes] = useState("1")
    const [description, setDescription] = useState("")
    const [ageRatingId, setAgeRatingId] = useState("1")
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState<number[]>([])
    const [genres, setGenres] = useState<number[]>([])
    const [countries, setCountries] = useState<number[]>([])
    const [blockedCountries, setBlockedCountries] = useState<number[]>([])
    const [actors, setActors] = useState<string[]>([])
    const [directors, setDirectors] = useState<string[]>([])
    const [actorInput, setActorInput] = useState("")
    const [directorInput, setDirectorInput] = useState("")

    const availableCountries = useMemo(
        () => countriesList.filter((c) => !blockedCountries.includes(c.id)),
        [blockedCountries]
    );

    const filteredCountries = useMemo(() => {
        if (searchTerm.trim() === "") {
            return undefined;
        }

        const filtered = availableCountries.filter((c) =>
            c.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.slice(0, 10);
    }, [availableCountries, searchTerm]);

    const selectedCountries  = countriesList.filter((c) => countries.includes(c.id) && c.value !== undefined);

    const handleSelectAll = () => {
        const allAvailable = availableCountries.map((c) => c.id);
        setCountries(allAvailable);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value === "") {
            setReleaseYear("");
            return;
        }

        const numericValue = parseInt(value, 10);

        if (numericValue >= 1900 && numericValue <= 2100) {
            setReleaseYear(value);
        }
    };

    const handleMultiSelect = (setter: (arr: number[]) => void, arr: number[], value: number) => {
        setter(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
    }

    const handleAddActor = () => {
        if (actorInput.trim()) {
            setActors([...actors, actorInput.trim()])
            setActorInput("")
        }
    }

    const handleAddDirector = () => {
        if (directorInput.trim()) {
            setDirectors([...directors, directorInput.trim()])
            setDirectorInput("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            title,
            releaseYear: Number(releaseYear),
            durationMinutes: Number(durationMinutes),
            description,
            ageRatingId: Number(ageRatingId),
            categories,
            genres,
            countries,
            blockedCountries,
            actors,
            directors,
        }
        await fetch("/api/content", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        })
        // Handle response
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Content</CardTitle>
                    <CardDescription>Fill in all required information</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required/>
                            </div>
                            <div>
                                <Label htmlFor="releaseYear">Release Year</Label>
                                <Select value={releaseYear} onValueChange={setReleaseYear}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                                <Input id="durationMinutes" type="number" value={durationMinutes} min="1"
                                       onChange={e => setDurationMinutes(e.target.value)} required/>
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={description}
                                          onChange={e => setDescription(e.target.value)} rows={4}/>
                            </div>
                            <div>
                                <Label htmlFor="ageRatingId">Age Rating</Label>
                                <Select value={ageRatingId} onValueChange={setAgeRatingId} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">PG (0)</SelectItem>
                                        <SelectItem value="2">PG-13 (13)</SelectItem>
                                        <SelectItem value="3">R (17)</SelectItem>
                                        <SelectItem value="4">NC-17 (18)</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <div>
                                <Label>Categories</Label>
                                <div className="flex flex-wrap gap-2">
                                    {categoriesList.map(({id, name}) => (
                                        <Button
                                            key={id}
                                            type="button"
                                            variant={categories.includes(id) ? "default" : "outline"}
                                            onClick={() => handleMultiSelect(setCategories, categories, id)}
                                        >
                                            {name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Genres</Label>
                                <div className="flex flex-wrap gap-2">
                                    {genresList.map(({id, genre}) => (
                                        <Button
                                            key={id}
                                            type="button"
                                            variant={genres.includes(id) ? "default" : "outline"}
                                            onClick={() => handleMultiSelect(setGenres, genres, id)}
                                        >
                                            {genre}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Countries</Label>
                                <Input type="text" className="mb-2 p-2 border rounded w-full" placeholder="Search countries..."
                                       value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></Input>

                                <div className="mb-4">
                                    <Label>Selected countries:</Label>{" "}
                                    {selectedCountries.length > 0
                                        ? selectedCountries.map((c) => c.value).join(", ")
                                        : "None"}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {filteredCountries?.length ? (
                                        filteredCountries?.map(({ id, value }) => (
                                            <Button
                                                key={id}
                                                type="button"
                                                variant={countries.includes(id) ? "default" : "outline"}
                                                onClick={() => handleMultiSelect(setCountries, countries, id)}
                                                aria-pressed={countries.includes(id)}
                                            >
                                                {value}
                                            </Button>
                                        ))) : null
                                    }
                                </div>



                                {/* Maybe later we can add a sections
                                <Label>Blocked Countries</Label>
                                <div className="flex flex-wrap gap-2">
                                    {countriesList
                                        .filter((c) => blockedCountries.includes(c.id))
                                        .map(({ id, value }) => (
                                            <Button
                                                key={id}
                                                types="button"
                                                variant="destructive"
                                                onClick={() => handleMultiSelect(setBlockedCountries, blockedCountries, id)}
                                                aria-pressed={true}
                                            >
                                                {value}
                                            </Button>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <Label>Actors</Label>
                                <div className="flex gap-2 mt-2">
                                    {actors.map((actor, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{actor}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Directors</Label>
                                <div className="flex gap-2 mt-2">
                                    {directors.map((director, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{director}</span>
                                    ))}
                                </div>
                            </div>
                        </div>*/}
                            </div>
                            <div>
                                <Label>Thumbnail</Label>
                                <div className="flex items-center gap-2">
                                    <Input type="file" accept="image/*" className="hidden" id="posterUpload" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("posterUpload")?.click()}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload Poster
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Click to upload a thumbnail image (required)
                                    </span>
                                </div>
                            </div>
                            <div>
                                {/*dialog videos*/}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Submit for Review</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}