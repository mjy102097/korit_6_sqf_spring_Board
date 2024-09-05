package com.study.SpringSecurityMybatis.dto.request;

import com.study.SpringSecurityMybatis.entity.Board;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReqWriteBoardDto {
    @NotBlank(message = "제목을 입력해 주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해 주세요.")
    private String content;

    public Board toEntity(Long id) {
        return Board.builder()
                .title(title)
                .content(content)
                .userId(id)
                .build();
    }
}
