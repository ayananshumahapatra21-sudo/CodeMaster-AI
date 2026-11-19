package com.codemaster.problem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    Optional<Problem> findBySlug(String slug);

    List<Problem> findByDifficultyIgnoreCase(String difficulty);

    @Query("SELECT p FROM Problem p JOIN p.topics t WHERE LOWER(t.name) = LOWER(:topicName)")
    List<Problem> findByTopicName(String topicName);

    List<Problem> findByTitleContainingIgnoreCase(String keyword);
}
