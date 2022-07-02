package ru.darkside.scaffold.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.model.service.ReportService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class ReportHistoryController {

    private final ReportService reportService;

    @GetMapping(value = "/employees/{id}/report_history")
    public String reportHistory(Model model, @PathVariable("id") Long id,
                                @RequestParam("startDate") String startDateStr,
                                @RequestParam("endDate") String endDateStr) {

        var dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startDate = startDateStr.isEmpty() ? null: LocalDate.parse(startDateStr, dateFormatter);
        LocalDate endDate = endDateStr.isEmpty() ? null: LocalDate.parse(endDateStr, dateFormatter);

        List<Employee> employees = reportService.showAllEmployeesBetweenDate(id, startDate, endDate).stream()
                .sorted((o1, o2) -> o2.getModifiedDate().compareTo(o1.getModifiedDate()))
                .collect(Collectors.toList());

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss"));
        model.addAttribute("employees", employees);
        model.addAttribute("nowDate", now);
        return "change_history_report";
    }
}
