package com.dot.demo;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class RegistrationValidatorTest {

    private final RegistrationValidator underTest = new RegistrationValidator();

    @Test
    public void itShouldValidateRegistration() {
        assertThat(underTest.test("ar66jjj")).isTrue();
    }

    @Test
    public void itShouldValidateIncorrectRegistration() {
        assertThat(underTest.test("ara6jjj")).isFalse();
    }

    @Test
    public void itShouldValidateTooLongRegistration() {
        assertThat(underTest.test("ae04sjvr")).isFalse();
    }

}