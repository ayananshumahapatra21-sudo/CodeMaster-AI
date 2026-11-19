package com.codemaster.progress.dto;

public class UserProgressDto {

    private int totalSolved;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;
    private int totalProblems;
    private int streakDays;
    private String acceptanceRate;

    public UserProgressDto() {}

    public UserProgressDto(int totalSolved, int easySolved, int mediumSolved, int hardSolved,
                           int totalProblems, int streakDays, String acceptanceRate) {
        this.totalSolved = totalSolved;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.totalProblems = totalProblems;
        this.streakDays = streakDays;
        this.acceptanceRate = acceptanceRate;
    }

    public int getTotalSolved() { return totalSolved; }
    public void setTotalSolved(int totalSolved) { this.totalSolved = totalSolved; }

    public int getEasySolved() { return easySolved; }
    public void setEasySolved(int easySolved) { this.easySolved = easySolved; }

    public int getMediumSolved() { return mediumSolved; }
    public void setMediumSolved(int mediumSolved) { this.mediumSolved = mediumSolved; }

    public int getHardSolved() { return hardSolved; }
    public void setHardSolved(int hardSolved) { this.hardSolved = hardSolved; }

    public int getTotalProblems() { return totalProblems; }
    public void setTotalProblems(int totalProblems) { this.totalProblems = totalProblems; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public String getAcceptanceRate() { return acceptanceRate; }
    public void setAcceptanceRate(String acceptanceRate) { this.acceptanceRate = acceptanceRate; }
}
