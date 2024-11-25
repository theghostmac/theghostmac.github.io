---
title: "Beyond Mocking: Rethinking Test Design Through Code Structure"
meta_title: "Better Code Design to Reduce Test Mocking"
description: "Learn how to structure your code to minimize mocking in tests through practical examples and real-world scenarios"
date: 2024-11-25T05:00:00Z
image: "/images/clean-code.png"
categories: ["Testing", "Architecture"]
author: "MacBobby Chibuzor"
tags: ["testing", "python", "architecture", "clean-code"]
draft: false
---

Recently, while working on a monitoring system that checks delegation balances across multiple blockchains, 
I had an enlightening experience that changed how I think about test design. 
The initial implementation was tightly coupled with API calls, requiring extensive mocking in tests. H
owever, through thoughtful refactoring, my colleague proposed a better way - one that made both the code and tests simpler and more maintainable.

## The Problem: Test Complexity Through Mocking

Consider this typical scenario - you're building a balance validation system that needs to fetch and verify data from external sources:

```python
def check_delegations():
    # Fetch data from multiple APIs
    delegations = api.get_delegations()
    balances = api.get_balances()
    validators = api.get_validators()

    # Process and validate
    for validator in validators:
        if validator.delegation != balances[validator.id]:
            raise ValidationError(f"Mismatch for {validator.id}")

    return True
```

To test this, you'd need something like:

```python
def test_check_delegations():
    # Set up mocks
    mock_api.get_delegations.return_value = {"val1": 1000}
    mock_api.get_balances.return_value = {"val1": 1000}
    mock_api.get_validators.return_value = [
        Validator(id="val1", delegation=1000)
    ]
    
    assert check_delegations()
```

This approach has several issues:
1. Tests become brittle and complex
2. Mock setup obscures test intent
3. Changes to API structure break tests
4. Business logic is mixed with data fetching

## The Solution: Separation of Concerns

Let's restructure this code to separate data fetching from business logic:

```python
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class ValidationData:
    delegations: Dict[str, int]
    balances: Dict[str, int]
    validators: List[dict]

def fetch_validation_data() -> ValidationData:
    """Handles all external data fetching."""
    return ValidationData(
        delegations=api.get_delegations(),
        balances=api.get_balances(),
        validators=api.get_validators()
    )

def validate_delegations(data: ValidationData) -> bool:
    """Pure business logic - no external dependencies."""
    for validator in data.validators:
        if validator.delegation != data.balances[validator.id]:
            raise ValidationError(f"Mismatch for {validator.id}")
    return True

def check_delegations() -> bool:
    """Composition root - connects data fetching with business logic."""
    data = fetch_validation_data()
    return validate_delegations(data)
```

Now our tests become much simpler and more focused:

```python
def test_validate_delegations_matching():
    """Test the happy path with matching delegations."""
    test_data = ValidationData(
        delegations={"val1": 1000},
        balances={"val1": 1000},
        validators=[{"id": "val1", "delegation": 1000}]
    )
    assert validate_delegations(test_data)

def test_validate_delegations_mismatch():
    """Test detection of mismatched amounts."""
    test_data = ValidationData(
        delegations={"val1": 1000},
        balances={"val1": 900},  # Mismatch
        validators=[{"id": "val1", "delegation": 1000}]
    )
    with pytest.raises(ValidationError):
        validate_delegations(test_data)
```

## Real-World Example: Delegation Monitoring

Let's look at a more complex real-world scenario. Imagine we need to monitor delegations across multiple validators and check for discrepancies:

```python
def check_validator_delegations(
    delegations: Dict[str, int],
    expected: Dict[str, int],
    config: Config
) -> List[str] | None:
    """
    Pure function to check validator delegations against expected values.
    Returns list of error messages if issues found.
    """
    errors = []
    for validator_id, amount in delegations.items():
        expected_amount = expected.get(validator_id, 0)
        
        # Check if difference exceeds tolerance
        if abs(amount - expected_amount) > config.tolerance:
            errors.append(
                f"Validator {validator_id} mismatch: "
                f"expected {expected_amount}, got {amount}"
            )
    
    return errors if errors else None

# Data fetching separated
def get_delegation_data() -> Tuple[Dict[str, int], Dict[str, int]]:
    """Handles external API calls to fetch delegation data."""
    return (
        api.get_current_delegations(),
        api.get_expected_delegations()
    )

# Main function composes the pieces
def monitor_delegations(config: Config) -> None:
    current, expected = get_delegation_data()
    if errors := check_validator_delegations(current, expected, config):
        alert_system.send(errors)
```

The tests can now focus on business logic without mock complexity:

```python
def test_delegation_checks():
    config = Config(tolerance=100)
    
    # Test matching delegations
    assert check_validator_delegations(
        delegations={"val1": 1000, "val2": 2000},
        expected={"val1": 1000, "val2": 2000},
        config=config
    ) is None

    # Test delegation mismatch
    errors = check_validator_delegations(
        delegations={"val1": 1000, "val2": 2500},
        expected={"val1": 1000, "val2": 2000},
        config=config
    )
    assert errors is not None
    assert "val2" in errors[0]
```

## Benefits of This Approach

This restructured approach offers several advantages:

1. **Clearer Testing** - Tests focus on business logic without mock setup complexity

2. **Better Separation of Concerns** - Data fetching is cleanly separated from processing

3. **Easier Maintenance** - Changes to API structure don't require test updates

4. **Improved Reusability** - Pure functions can be used in different contexts

5. **Better Error Handling** - Data validation and error cases are more explicit

## When To Use Mocks

While this approach reduces the need for mocks, they still have their place:

- Testing integration points with external systems
- Verifying error handling for API failures
- Testing notification/alerting systems
- Simulating race conditions or timing issues

The key is to use mocks sparingly and only when truly necessary.

## Conclusion

By rethinking our code structure to separate data fetching from business logic, we can dramatically simplify our tests and improve code maintainability. The extra effort in designing clean interfaces pays off in more reliable, easier-to-test code.

Remember: if you find yourself writing complex mock setups, it might be a sign to reconsider your code structure first. Often, the solution lies in better separation of concerns rather than more sophisticated mocking.

Through practical examples like our delegation monitoring system, we've seen how this approach leads to cleaner, more testable code while maintaining functionality. The next time you reach for a mock, consider if restructuring your code might offer a better solution.
