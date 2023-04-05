import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { NgForm } from '@angular/forms';
import { Renderer2,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @ViewChild('toggleNote') toggleNote: ElementRef;
  @ViewChild('form') form: NgForm;
  // @ViewChild('menu') menu: ElementRef;

  constructor( public notesService: NotesService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{ // Listen for window clicks
        if(!this.toggleNote.nativeElement.contains(e.target) && this.isMenuOpen){ // If the click is outside of the element we're seeking
            this.isMenuOpen=false; // Remove the menu
            this.form.ngSubmit.emit(); // Submit the form
        }
    });
  }

  isMenuOpen = false; // Var for the menu being open

  openNote(event: any) {
    if(this.toggleNote.nativeElement.contains(event.target)) { // If the element is within the form
      this.isMenuOpen = true
    }
  }

  ngOnInit(): void {
    this.resetNoteForm();
  }

  resetNoteForm(form?: NgForm) {
    if(form != null) {
      form.reset();
      this.notesService.resetNote();
    }
  }

  addNote(form: NgForm) {
    console.log(form.value)
    this.notesService.createNote(form.value).subscribe(response => {
      // console.log(response);
    });
    this.resetNoteForm(form);
  }

}
