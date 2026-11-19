package com.codemaster.progress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);
    Optional<UserProgress> findByUserIdAndProblemId(Long userId, Long problemId);
    boolean existsByUserIdAndProblemId(Long userId, Long problemId);
    long countByUserId(Long userId);
}
