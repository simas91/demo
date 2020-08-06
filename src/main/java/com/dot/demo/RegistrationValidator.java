package com.dot.demo;

import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public class RegistrationValidator implements Predicate<String> {

    private static final Predicate<String> IS_REGISTRATION_VALID =
            Pattern.compile("^[A-Z]{2}[0-9]{2}[A-Z]{3}$", Pattern.CASE_INSENSITIVE).asPredicate();

    @Override
    public boolean test(String registration) {
        return IS_REGISTRATION_VALID.test(registration);
    }
}
