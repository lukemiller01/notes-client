export class Note {
    id: string | null;
    title: string;
    description: string;
    color: string;
    created: Date | null;
}

// TODO:
    // .NET backend data transfer object parameters are camelcase,
    // But the data here is received lowercase