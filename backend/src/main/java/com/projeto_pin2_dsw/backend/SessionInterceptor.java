/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.projeto_pin2_dsw.backend;

import com.projeto_pin2_dsw.backend.model.Sessao;
import com.projeto_pin2_dsw.backend.repository.SessaoRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

@Component
public class SessionInterceptor implements HandlerInterceptor {

    @Autowired
    private SessaoRepository sessaoRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();
        if ((path.equals("/users/login")) || (path.contains("logout"))) {
            return true;
        }

        String sessionId = request.getHeader("SessionId");
        if (sessionId == null || sessionId.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        Optional<Sessao> sessaoOp = sessaoRepository.findTopByIdOrderByDataCriacaoDesc(sessionId);
        if (!sessaoOp.isPresent() || !sessaoOp.get().isValida()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        return true;
    }
}
