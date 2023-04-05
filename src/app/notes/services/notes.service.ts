import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note';

// TO make HTTP requests to API
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  note: Note = new Note();
  notes: Note[] = [];
  apiURL = "http://localhost:5264/api/Notes";

  // Gets list of Notes
  getNotes() {
    return this.http.get(this.apiURL).subscribe(c => {
      this.notes = c as Note[];
    });
  }

  // Creates a note
  createNote(note: Note) {
    return this.http.post(this.apiURL, note);
  }

  // Updates a note
  putNote(note: Note) {
    return this.http.put(this.apiURL + '/' + note.id, note.id);
  }

  // Gets a note
  getNote(note: Note) {
    return this.http.get(note.id!); // TODO: fix Asserts non-null?
  }

  // Deletes a note
  deleteNote(note: Note) {
    return this.http.delete(note.id!); // TODO: fix Asserts non-null?
  }

  resetNote() {
    this.note = {
      id: null,
      title: "",
      description: "",
      color: "",
      created: null,
    }
  }
}
