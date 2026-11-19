package com.codemaster.leaderboard;

public class LeaderboardEntryDto {

    private int rank;
    private Long userId;
    private String name;
    private int score;
    private int problemsSolved;
    private String badge;
    private String avatarUrl;

    public LeaderboardEntryDto() {}

    public LeaderboardEntryDto(int rank, Long userId, String name, int score, int problemsSolved, String badge, String avatarUrl) {
        this.rank = rank;
        this.userId = userId;
        this.name = name;
        this.score = score;
        this.problemsSolved = problemsSolved;
        this.badge = badge;
        this.avatarUrl = avatarUrl;
    }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(int problemsSolved) { this.problemsSolved = problemsSolved; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
