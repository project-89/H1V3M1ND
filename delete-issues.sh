#!/bin/bash

# Get all issues from project-89/Hive repository and delete them
gh issue list -R project-89/Hive --limit 1000 --json number | jq -r '.[].number' | while read -r number; do
  echo "Deleting issue #$number from project-89/Hive"
  gh issue delete "$number" -R project-89/Hive --yes
done 