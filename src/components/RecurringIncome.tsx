type RecurringIncomeProps = {
  isRecurring: boolean;
  setIsRecurring: (isRecurring: boolean) => void;
  setRecurringType: (recurringType: string) => void;
};

function RecurringIncome({ isRecurring, setIsRecurring, setRecurringType }: RecurringIncomeProps) {
  return (
    <div className="mb-4">
      <label htmlFor="recurring" className="mb-2 block font-medium text-gray-700">
        Is this a recurring expense?
      </label>
      <select
        id="recurring"
        name="recurring"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
        onChange={(e) => setIsRecurring(e.target.value === 'Recurring')}
        required
      >
        <option value="" disabled selected>
          Select Type
        </option>
        <option value="One-time">One-time</option>
        <option value="Recurring">Recurring</option>
      </select>

      {isRecurring && (
        <div className="mt-4">
          <label htmlFor="recurringType" className="mb-2 block font-medium text-gray-700">
            Recurring Frequency
          </label>
          <select
            id="recurringType"
            name="recurringType"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            onChange={(e) => setRecurringType(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Choose Frequency
            </option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default RecurringIncome;
