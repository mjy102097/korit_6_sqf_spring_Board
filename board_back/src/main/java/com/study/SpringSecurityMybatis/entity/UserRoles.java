package com.study.SpringSecurityMybatis.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserRoles {
    private Long id;
    private Long userId;
    private Long roleId;
    private Role role;
}
