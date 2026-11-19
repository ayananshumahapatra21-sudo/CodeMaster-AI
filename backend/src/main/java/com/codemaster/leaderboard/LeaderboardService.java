package com.codemaster.leaderboard;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {

    public List<LeaderboardEntryDto> getGlobalLeaderboard() {
        List<LeaderboardEntryDto> list = new ArrayList<>();
        list.add(new LeaderboardEntryDto(1, 101L, "Ayananshu Mahapatra", 2850, 84, "Grandmaster", "https://api.dicebear.com/7.x/bottts/svg?seed=Ayananshu"));
        list.add(new LeaderboardEntryDto(2, 102L, "Sarah Connor", 2420, 71, "Master", "https://api.dicebear.com/7.x/bottts/svg?seed=Sarah"));
        list.add(new LeaderboardEntryDto(3, 103L, "David Kim", 2180, 65, "Candidate Master", "https://api.dicebear.com/7.x/bottts/svg?seed=David"));
        list.add(new LeaderboardEntryDto(4, 104L, "Elena Rostova", 1950, 58, "Expert", "https://api.dicebear.com/7.x/bottts/svg?seed=Elena"));
        list.add(new LeaderboardEntryDto(5, 105L, "Alex Rivera", 1720, 52, "Specialist", "https://api.dicebear.com/7.x/bottts/svg?seed=Alex"));
        return list;
    }
}
