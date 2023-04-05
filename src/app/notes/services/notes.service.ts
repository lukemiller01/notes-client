import { HttpClient, HttpParams } from '@angular/common/http';
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
  createNote(note: Note) { // TODO: remove query params and have .NET backend accept JSON body
    var options = {
      Title: note.title,
      Description: note.description,
      Color: note.color
    };
    var query = new HttpParams({fromObject: options}).toString()
    return this.http.post(this.apiURL + '?' + query, note);
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
    console.log(note.id)
    return this.http.delete(this.apiURL + '/' + note.id);
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
