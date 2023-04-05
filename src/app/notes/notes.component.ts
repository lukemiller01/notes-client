import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';
import { Note } from './models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor( public notesService: NotesService) {}

  // Lifecycle hook
  ngOnInit(): void {
    this.notesService.getNotes();
  }

  loadNote(note: Note) {
    this.notesService.note = Object.assign({}, note);
  }

  deleteNote(note: Note) {
    if(confirm("Are you sure you want to delete this note?")) {
      this.notesService.deleteNote(note).subscribe(c => {
        this.notesService.getNotes();
        this.notesService.resetNote();
      })
    }
  }
}
