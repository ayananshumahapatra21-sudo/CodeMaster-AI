package com.codemaster.submission;

import com.codemaster.problem.TestCase;
import jakarta.persistence.*;

@Entity
@Table(name = "submission_results")
public class SubmissionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false)
    private TestCase testCase;

    @Column(name = "execution_time")
    private Long executionTime;

    @Column(name = "memory")
    private Long memory;

    @Column(length = 30)
    private String verdict = "PENDING";

    public SubmissionResult() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Submission getSubmission() { return submission; }
    public void setSubmission(Submission submission) { this.submission = submission; }

    public TestCase getTestCase() { return testCase; }
    public void setTestCase(TestCase testCase) { this.testCase = testCase; }

    public Long getExecutionTime() { return executionTime; }
    public void setExecutionTime(Long executionTime) { this.executionTime = executionTime; }

    public Long getMemory() { return memory; }
    public void setMemory(Long memory) { this.memory = memory; }

    public String getVerdict() { return verdict; }
    public void setVerdict(String verdict) { this.verdict = verdict; }
}
