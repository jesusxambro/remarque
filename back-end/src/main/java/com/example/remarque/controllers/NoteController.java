package com.example.remarque.controllers;


import com.example.remarque.dao.NoteRepository;
import com.example.remarque.model.Note;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/notes")
public class NoteController {

    final private NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public List<Note> getAllNotes(){
        return this.repository.findAll();
    }
    @GetMapping("/{id}")
    public Note getById(@PathVariable Long id) {
        return this.repository.getReferenceById(id);
    }

    @PostMapping("/")
    public Note addNote(@RequestBody Note NoteToAdd) {
        return this.repository.save(NoteToAdd);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.repository.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Note updateTask(@PathVariable Long id, @RequestBody Note taskToUpdate) {
        Note inDb = this.repository.getReferenceById(id);
        Long originalID = inDb.getId();
        inDb = taskToUpdate;
        inDb.setId(originalID);
        return this.repository.save(inDb);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public String handleElementNotFound(Exception e) {
        return e.getMessage();
    }

}
