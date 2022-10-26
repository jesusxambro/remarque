package com.example.remarque;
import com.example.remarque.dao.NoteRepository;
import com.example.remarque.model.Note;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class NoteControllerTests {
    @Autowired
    MockMvc mvc;

    @Autowired
    NoteRepository repository;

    Note Weekend;
    Note Chapter1;

    List<Note> listOfNotes;

    @BeforeEach
    void initDb(){
        Weekend = new Note();
        Chapter1 = new Note();

        Weekend.setTitle("Weekend");
        Weekend.setContent("The things to do this weekend are lorem ipsum.");

        Chapter1.setTitle("The future of webdev");
        Chapter1.setContent("Is now.");

        listOfNotes = new ArrayList<>(Arrays.asList(Weekend,Chapter1));
    }
    @Test
    @Transactional
    @Rollback
    public void getListOfNotes()throws Exception{
        this.repository.save(Weekend);
        this.repository.save(Chapter1);
        MockHttpServletRequestBuilder request = get("/notes/");
        String jsonWeekendTitle = "Weekend";
        String jsonChapterTitle = "The future of webdev";
        this.mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(jsonWeekendTitle));
    }



}
