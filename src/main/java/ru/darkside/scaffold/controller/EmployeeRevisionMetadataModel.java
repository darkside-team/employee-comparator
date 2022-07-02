package ru.darkside.scaffold.controller;

import lombok.Getter;
import org.springframework.data.history.RevisionMetadata;
import org.springframework.hateoas.RepresentationModel;
import ru.darkside.scaffold.domain.model.projection.EmployeeRevisionProjection;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Getter
class EmployeeRevisionMetadataModel extends RepresentationModel<EmployeeRevisionMetadataModel> {

  private final Integer num;
  private final String type;
  private final String timestamp;
  private final EmployeeRevisionProjection employee;

  EmployeeRevisionMetadataModel(RevisionMetadata<Integer> revisionMetadata, EmployeeRevisionProjection employee) {
    num = revisionMetadata.getRequiredRevisionNumber();
    type = revisionMetadata.getRevisionType().name();
    this.employee = employee;
    DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
            .withZone(ZoneId.from(ZoneOffset.UTC));
    timestamp = formatter
            .format(revisionMetadata.getRequiredRevisionInstant());
  }

}
