package com.service;

import com.mapper.UserMapper;
import com.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
/**
 * Created by Administrator on 2016/12/13.
 */
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.isEmpty()) {
            throw new BadCredentialsException("用户名不能为空!");
        }
        User user = userMapper.selectByUsername(username);
        if( user == null ){
            throw new BadCredentialsException("用户不存在!");
        }
        String password = user.getPassword();
//        password = MD5Util.getEncrypt(password);
        user.setPassword(password);
        return user;
    }

}
