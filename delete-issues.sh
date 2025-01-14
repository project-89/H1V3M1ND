#!/bin/bash

# Get all issues from project-89/H1V3M1ND repository and delete them
gh issue list -R project-89/H1V3M1ND --limit 1000 --json number | jq -r '.[].number' | while read -r number; do
  echo "Deleting issue #$number from project-89/H1V3M1ND"
  gh issue delete "$number" -R project-89/H1V3M1ND --yes
done 