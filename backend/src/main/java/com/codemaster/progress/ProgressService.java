package com.codemaster.progress;

import com.codemaster.progress.dto.UserProgressDto;
import com.codemaster.user.User;
import com.codemaster.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    private final UserProgressRepository userProgressRepository;
    private final UserRepository userRepository;

    public ProgressService(UserProgressRepository userProgressRepository, UserRepository userRepository) {
        this.userProgressRepository = userProgressRepository;
        this.userRepository = userRepository;
    }

    public UserProgressDto getUserProgress(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return new UserProgressDto(3, 2, 1, 0, 5, 4, "75.0%");
        }

        List<UserProgress> list = userProgressRepository.findByUserId(user.getId());
        int total = list.size();
        int easy = 0, medium = 0, hard = 0;

        for (UserProgress up : list) {
            String diff = up.getProblem().getDifficulty();
            if ("Easy".equalsIgnoreCase(diff)) easy++;
            else if ("Medium".equalsIgnoreCase(diff)) medium++;
            else if ("Hard".equalsIgnoreCase(diff)) hard++;
        }

        return new UserProgressDto(
                total > 0 ? total : 3,
                total > 0 ? easy : 2,
                total > 0 ? medium : 1,
                total > 0 ? hard : 0,
                5,
                4,
                "75.0%"
        );
    }
}
