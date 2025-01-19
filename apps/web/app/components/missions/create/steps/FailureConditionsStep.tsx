'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Input, Label, Button, RadioGroup, RadioGroupItem } from '@H1V3M1ND/ui';
import {
  Mission,
  FailureCondition,
  FailureConditionSeverity,
  FailureConditionCategory,
} from '@/lib/types';

interface FailureConditionsStepProps {
  data: Partial<Mission>;
  onUpdate: (data: Partial<Mission>) => void;
}

export function FailureConditionsStep({ data, onUpdate }: FailureConditionsStepProps) {
  const [newCondition, setNewCondition] = useState<Partial<FailureCondition>>({
    severity: FailureConditionSeverity.Medium,
    category: FailureConditionCategory.Performance,
  });

  const handleAddCondition = () => {
    if (!newCondition.description?.trim()) return;

    const condition: FailureCondition = {
      id: Math.random().toString(36).substring(7),
      description: newCondition.description,
      severity: newCondition.severity || FailureConditionSeverity.Medium,
      category: newCondition.category || FailureConditionCategory.Performance,
    };

    onUpdate({
      ...data,
      failureConditions: [...(data.failureConditions || []), condition],
    });

    setNewCondition({
      severity: FailureConditionSeverity.Medium,
      category: FailureConditionCategory.Performance,
    });
  };

  const handleRemoveCondition = (id: string) => {
    onUpdate({
      ...data,
      failureConditions: data.failureConditions?.filter((c) => c.id !== id) || [],
    });
  };

  const getSeverityColor = (severity: FailureConditionSeverity) => {
    switch (severity) {
      case FailureConditionSeverity.Low:
        return 'text-yellow-400';
      case FailureConditionSeverity.Medium:
        return 'text-orange-400';
      case FailureConditionSeverity.High:
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cyber-purple-light">Add New Condition</h3>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-cyber-purple-light">
            Description
          </Label>
          <Input
            id="description"
            value={newCondition.description || ''}
            onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
            placeholder="Describe the failure condition..."
            className="bg-cyber-dark border-cyber-purple"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-cyber-purple-light">Severity</Label>
            <RadioGroup
              value={newCondition.severity}
              onValueChange={(value) =>
                setNewCondition({
                  ...newCondition,
                  severity: value as FailureConditionSeverity,
                })
              }
              className="flex flex-col space-y-1"
            >
              {Object.values(FailureConditionSeverity).map((severity) => (
                <div key={severity} className="flex items-center space-x-2">
                  <RadioGroupItem value={severity} id={`severity-${severity}`} />
                  <Label
                    htmlFor={`severity-${severity}`}
                    className={getSeverityColor(severity as FailureConditionSeverity)}
                  >
                    {severity}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-cyber-purple-light">Category</Label>
            <RadioGroup
              value={newCondition.category}
              onValueChange={(value) =>
                setNewCondition({
                  ...newCondition,
                  category: value as FailureConditionCategory,
                })
              }
              className="flex flex-col space-y-1"
            >
              {Object.values(FailureConditionCategory).map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <Button
          onClick={handleAddCondition}
          disabled={!newCondition.description?.trim()}
          className="w-full mt-4"
        >
          Add Condition
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cyber-purple-light">Current Conditions</h3>

        {data.failureConditions?.length === 0 && (
          <p className="text-gray-400 text-center py-4">No failure conditions added yet</p>
        )}

        {data.failureConditions?.map((condition) => (
          <div
            key={condition.id}
            className="flex items-start justify-between p-4 rounded-lg bg-cyber-dark border border-cyber-purple"
          >
            <div className="space-y-1">
              <p className="text-white">{condition.description}</p>
              <div className="flex space-x-4 text-sm">
                <span className={getSeverityColor(condition.severity)}>{condition.severity}</span>
                <span className="text-gray-400">{condition.category}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCondition(condition.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
