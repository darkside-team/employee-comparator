package ru.darkside.scaffold.generator;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import ru.darkside.scaffold.domain.model.*;
import ru.darkside.scaffold.domain.repository.*;
import ru.darkside.scaffold.security.service.annotation.RunAsSystemUser;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Component
@Slf4j
@Transactional
@ConditionalOnProperty(
        value="employee.data.generation.enabled",
        havingValue = "true",
        matchIfMissing = false)
public class DataGenerator implements CommandLineRunner {

    private final GratitudeRepository gratitudeRepository;
    private final EmployeeRepository employeeRepository;
    private final NominationRepository nominationRepository;
    private final DepartmentRepository departmentRepository;
    private final IndicatorRepository indicatorRepository;
    private final ProjectRepository projectRepository;
    private final EmployeeRoleRepository employeeRoleRepository;
    private final EmployeePostRepository employeePostRepository;
    private final ModificationSourceRepository modificationSourceRepository;

    private static final Random rnd = new Random();

    static final List<ModificationSource> modificationSources = List.of(
            new ModificationSource("1С", "1C"),
            new ModificationSource("Jira", "JIRA"),
            new ModificationSource("УМК", "UMK"),
            new ModificationSource("Ручной ввод", "HAND_INPUT")
    );

    static final List<EmployeePost> employeePosts = List.of(
            new EmployeePost("Эксперт 1 катеригории"),
            new EmployeePost("Ведущий эксперт"),
            new EmployeePost("Главный эксперт")
    );

    static final List<EmployeeRole> employeeRoles = List.of(
            new EmployeeRole("Разработчик"),
            new EmployeeRole("Аналитик"),
            new EmployeeRole("Технический писатель"),
            new EmployeeRole("Тех-лид"),
            new EmployeeRole("Тим-лид")
    );

    static final List<Project> projects = List.of(
            new Project("АСДКО", "#0088FE"),
            new Project("ФОР", "#00C49F"),
            new Project("АС Активы", "#FFBB28"),
            new Project("АС Сибирь", "#FF8042")
    );

    static final List<Gratitude> gratitudes = List.of(
            new Gratitude("Лучший аналитик"),
            new Gratitude("Душа РЦР"),
            new Gratitude("Лучший разработчик"),
            new Gratitude("Лучший разработчик")

    );

    static final List<Nomination> nominations = List.of(
            new Nomination("МегаСотрудник (1кв. 2021 года)"),
            new Nomination("МегаСотрудник (2кв. 2021 года)"),
            new Nomination("МегаСотрудник (3кв. 2021 года)"),
            new Nomination("МегаСотрудник (4кв. 2021 года)")
    );

    static final List<Indicator> indicators = List.of(
            new Indicator("Производительность", "performanceCurrValue"),
            new Indicator("Качество", "qualityCurrValue"),
            new Indicator("Эффективность", "efficiencyCurrValue"),
            new Indicator("Среднее кол-во задач за период", "avgTaskCount"),
            new Indicator("Средняя сложность задач за период", "avgTaskComplexity"),
            new Indicator("Знание принципов актуальности и полноты текста", "umkIndicator1"),
            new Indicator("Умение оценивать трудоемкость и сложность задач", "umkIndicator2"),
            new Indicator("Знание текстового редактора  Word", "umkIndicator3"),
            new Indicator("Знание Java", "umkIndicator4"),
            new Indicator("Знание JavaScript + React", "umkIndicator5"),
            new Indicator("Знание шаблонов проектирования", "umkIndicator6"),
            new Indicator("Знание BPMN", "umkIndicator7"),
            new Indicator("Знание UML", "umkIndicator8"),
            new Indicator("Работа с требованиями с применением метологии системного анализа", "umkIndicator9")
    );

    static final List<Department> departments = List.of(new Department("ОА"), new Department("ОР"));

    static final List<EmployeeGratitude> employeeGratitudes = new ArrayList<>();

    private final List<SimpleEmployee> simpleEmployees = List.of(
            new SimpleEmployee("Андрей", "Криовносов", "Andrey Krivonosov", "krivonosovav"),
            new SimpleEmployee("Михаил", "Прокофьев", "Mikhail Prokofiev", "prokofievmv"),
            new SimpleEmployee("Рыжкина", "Дарья", "Daria Rijkina", "rijkinada"),
            new SimpleEmployee("Анастасия", "Проданик", "Prodanik Anastasia", "prodanika"),
            new SimpleEmployee("Оксана", "Колесникова", "-", "-"),
            new SimpleEmployee("Артем", "Белов", "-", "-"),
            new SimpleEmployee("Ярослав", "Демидов", "-", "-"),
            new SimpleEmployee("Алексей", "Аносов", "-", "-"),
            new SimpleEmployee("Никита", "Шумилов", "-", "-"),
            new SimpleEmployee("Дмитрий", "Гасилов", "-", "-"),
            new SimpleEmployee("Екатерина", "Королева", "-", "-"),
            new SimpleEmployee("Сергей", "Буцкий", "-", "-"),
            new SimpleEmployee("Екатерина", "Екатеринчук", "-", "-"),
            new SimpleEmployee("Ксения", "Пахомова", "-", "-"),
            new SimpleEmployee("Сергей", "Максимов", "-", "-"),
            new SimpleEmployee("Владислав", "Подъяблонский", "-", "-"),
            new SimpleEmployee("Александр", "Коваленко", "-", "-"),
            new SimpleEmployee("Александр", "Сергеев", "-", "-"),
            new SimpleEmployee("Николай", "Анушкин", "-", "-"),
            new SimpleEmployee("Алексей", "Подосенов", "-", "-"),
            new SimpleEmployee("Юлия", "Пикалова", "-", "-"),
            new SimpleEmployee("Иван", "Крылов", "-", "-"),
            new SimpleEmployee("Ян", "Юлдашев", "-", "-"),
            new SimpleEmployee("Дмитрий", "Пряничников", "-", "-"),
            new SimpleEmployee("Артем", "Нетрибейчук", "-", "-"),
            new SimpleEmployee("Федоров", "Роман", "-", "-"),
            new SimpleEmployee("Владимир", "Реннер", "-", "-"),
            new SimpleEmployee("Станислав", "Десницкий", "-", "-")

            );

    @RunAsSystemUser
    @Override
    public void run(String... args) throws Exception {
        log.debug(">>> data generation started...");

        nominationRepository.saveAll(nominations);
        gratitudeRepository.saveAll(gratitudes);
        departmentRepository.saveAll(departments);
        indicatorRepository.saveAll(indicators);
        projectRepository.saveAll(projects);
        employeeRoleRepository.saveAll(employeeRoles);
        employeePostRepository.saveAll(employeePosts);
        modificationSourceRepository.saveAll(modificationSources);

        var randomProjectInvolvements = new RandomProjectInvolvements(projects);
        var randomEmployeeIndicators = new RandomEmployeeIndicators();
        var randomDepartment = new RandomDepartment(departments);
        var randomEmployeeYearPerformance = new RandomEmployeeYearPerformance();
        var randomEmployeeGratitudes = new RandomEmployeeGratitudes(gratitudes);
        var randomNominations = new RandomNominations(nominations);
        var randomWorkingDaysGenerator = new RandomWorkingDayGenerator();
        var randomRole = new RandomEmployeeRole(employeeRoles);
        var randomModificationSource = new RandomModificationSource(modificationSources);
        var randomEmployeePost = new RandomEmployeePost(employeePosts);

        var employees = new ArrayList<Employee>();
        simpleEmployees.forEach(se -> {
            employees.add(
                    new Employee(se.getFirstName(), se.getLastName(), se.getDiscordLogin(), se.getInternalLogin(), true, 0, randomEmployeeIndicators.get(), randomDepartment.get(), randomRole.get(), randomEmployeePost.get(), randomModificationSource.get(), null, null, null, null, randomEmployeeGratitudes.get(), randomNominations.get(), randomEmployeeYearPerformance.get(), randomProjectInvolvements.get(), randomWorkingDaysGenerator.get())
            );

        });

       /* var employees = List.of(new Employee("Андрей", "Криовносов", "Andrey Krivonosov", "krivonosovav", true, randomEmployeeIndicators.get(), randomDepartment.get(), randomRole.get(), randomEmployeePost.get(), randomModificationSource.get(), null, null, null, null, randomEmployeeGratitudes.get(), randomNominations.get(), randomEmployeeYearPerformance.get(), randomProjectInvolvements.get(), randomWorkingDaysGenerator.get()),
                                              new Employee("Михаил", "Прокофьев", "Mikhail Prokofiev", "prokofievmv", true,  randomEmployeeIndicators.get(), randomDepartment.get(), randomRole.get(), randomEmployeePost.get(),randomModificationSource.get(), null,null,null, null, randomEmployeeGratitudes.get(), randomNominations.get(), randomEmployeeYearPerformance.get(), randomProjectInvolvements.get(), randomWorkingDaysGenerator.get()),
                                              new Employee("Рыжкина", "Дарья", "Daria Rijkina", "rijkinada", true, randomEmployeeIndicators.get(), randomDepartment.get(), randomRole.get(), randomEmployeePost.get(), randomModificationSource.get(), null,null,null, null, randomEmployeeGratitudes.get(), randomNominations.get(), randomEmployeeYearPerformance.get(), randomProjectInvolvements.get(), randomWorkingDaysGenerator.get())
        );*/

        employeeRepository.saveAll(employees);
    }

    @Getter
    @RequiredArgsConstructor
    static class SimpleEmployee {
        private final String firstName;
        private final String lastName;
        private final String discordLogin;
        private final String internalLogin;
    }
}


