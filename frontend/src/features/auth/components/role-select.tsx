import {UserRole} from "@/features/auth/types/auth";

type Props = {
    onChange: (role: UserRole) => void;
    value: UserRole;
    id? : string;
}

export function RoleSelect({ value, onChange, id }: Props ) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                Login as
            </label>
            <select
                id={id}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                           ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
                           placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={value}
                onChange={(e) => onChange(e.target.value as UserRole)}
            >
                <option value="Admin">Administrator</option>
                <option value="Moderator">Moderator</option>
            </select>
        </div>
    );
}