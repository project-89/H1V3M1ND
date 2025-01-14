#!/bin/bash

# First, create all required labels
gh label create phase-1 --color "0e8a16" --description "Phase 1: Foundation" || true
gh label create phase-2 --color "fbca04" --description "Phase 2: Core Features" || true
gh label create phase-3 --color "d4c5f9" --description "Phase 3: Polish & Testing" || true
gh label create frontend --color "1d76db" --description "Frontend related" || true
gh label create backend --color "b60205" --description "Backend related" || true
gh label create smart-contract --color "5319e7" --description "Smart contract related" || true
gh label create ui-ux --color "0052cc" --description "UI/UX related" || true
gh label create security --color "b60205" --description "Security related" || true
gh label create testing --color "fbca04" --description "Testing related" || true
gh label create blockchain --color "5319e7" --description "Blockchain related" || true

# Get the number of phases
num_phases=$(yq eval '.phases | length' tasks.yml)

# Loop through each phase
for ((p=0; p<$num_phases; p++)); do
  # Get the number of tasks in this phase
  num_tasks=$(yq eval ".phases[$p].tasks | length" tasks.yml)
  
  # Loop through each task in this phase
  for ((t=0; t<$num_tasks; t++)); do
    echo "Processing phase $p, task $t"
    
    # Extract task details
    title=$(yq eval ".phases[$p].tasks[$t].title" tasks.yml)
    description=$(yq eval ".phases[$p].tasks[$t].description" tasks.yml)
    labels=$(yq eval ".phases[$p].tasks[$t].labels | join(\",\")" tasks.yml)
    estimate=$(yq eval ".phases[$p].tasks[$t].estimate" tasks.yml)
    
    # Format subtasks
    subtasks=$(yq eval ".phases[$p].tasks[$t].subtasks[]" tasks.yml | while read -r line; do
      echo "- [ ] $line"
    done)
    
    # Format acceptance criteria
    acceptance=$(yq eval ".phases[$p].tasks[$t].acceptance_criteria[]" tasks.yml | while read -r line; do
      echo "- [ ] $line"
    done)

    # Create body with proper formatting
    body="Status: Backlog
Estimate: $estimate

# Description
$description

## Acceptance Criteria
$acceptance

## Sub-Tasks
$subtasks"

    # Check if we have a valid title before creating the issue
    if [ -n "$title" ] && [ "$title" != "null" ]; then
      echo "Creating issue: $title"
      
      # Create the issue and add it directly to the project
      gh issue create \
        --title "$title" \
        --body "$body" \
        --label "$labels" \
        --project "H1V3M1ND Development" \
        -R project-89/H1V3M1ND
        
      echo "Created issue and added to project"
    else
      echo "Skipping issue creation due to invalid title"
    fi
    
    echo "----------------------------------------"
  done
done 