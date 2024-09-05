package com.study.SpringSecurityMybatis.service;

import com.study.SpringSecurityMybatis.dto.request.ReqWriteBoardDto;
import com.study.SpringSecurityMybatis.entity.Board;
import com.study.SpringSecurityMybatis.repository.BoardMapper;
import com.study.SpringSecurityMybatis.security.principal.PrincipalUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    private BoardMapper boardMapper;

    public int writeBoard(ReqWriteBoardDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        PrincipalUser principalUser = (PrincipalUser) auth.getPrincipal();
        Board board = dto.toEntity(principalUser.getId());
        boardMapper.save(board);
        System.out.println("board.getId() 찍기 : " + board.getId());
        return board.getId();
    }
}
