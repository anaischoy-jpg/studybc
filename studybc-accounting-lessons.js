(() => {
  const curriculumUrl = 'https://curriculum.gov.bc.ca/curriculum';
  const lessonsByCourse = {
    accounting11: [
      {
        title: 'Business transactions', unit: 'Accounting Foundations',
        goals: ['Decide whether an event is an accounting transaction', 'Trace a transaction through the accounting equation', 'Use source documents as evidence'],
        vocabulary: [['Transaction', 'A business event that can be measured in money and changes the business’s financial position.'], ['Source document', 'Evidence of a transaction, such as a receipt, invoice, deposit slip, or contract.'], ['Accounting entity', 'The business is accounted for separately from its owner and other businesses.']],
        sections: [
          ['Recognize a transaction', 'Record events that change the business and can be measured reliably in money. Buying supplies, earning service revenue, borrowing cash, and paying rent are transactions. Planning to buy a computer is not: no exchange or obligation has occurred yet. Personal purchases by the owner are not business expenses.'],
          ['Trace the effects', 'Every transaction has at least two effects. The accounting equation, Assets = Liabilities + Owner’s Equity, must remain balanced. A cash purchase of supplies increases one asset and decreases another; buying equipment on credit increases assets and liabilities.'],
          ['Keep evidence', 'A source document records what happened, when, with whom, and for how much. Use it to decide the account, amount, and date before entering the transaction. A document supports an entry; it does not by itself prove the entry is classified correctly.']
        ],
        examples: [{
          prompt: 'A sole proprietor buys $120 of supplies with business cash. Show the effects.',
          steps: ['Supplies are a business asset, so Supplies increases by $120.', 'Cash is an asset and was paid, so Cash decreases by $120.', 'The total assets have no net change; liabilities and owner’s equity do not change.'],
          answer: 'Supplies +$120; Cash −$120. The equation remains balanced.'
        }],
        questions: [
          ['The owner plans to buy a delivery van next month. What should the business record today?', ['A vehicle and a payable', 'A transaction, because a plan is measurable', 'No transaction yet; no exchange or obligation has occurred', 'An expense'], 2, 'An intention to buy is not a completed transaction and has not created an obligation.'],
          ['A business buys equipment on credit. Which equation effects occur?', ['Assets increase and liabilities increase', 'Assets decrease and equity increases', 'Liabilities decrease and expenses increase', 'Only equity changes'], 0, 'Equipment increases assets; the amount owed increases liabilities by the same amount.']
        ],
        mistakes: ['Recording personal owner spending as a business expense.', 'Recording a plan or estimate as if a transaction had already occurred.'],
        summary: ['Record measurable business events, not intentions.', 'Each transaction has at least two effects.', 'Source documents support the date, amount, and account choice.'],
        cheatSheet: ['Assets = Liabilities + Owner’s Equity', 'Use the accounting entity concept', 'Keep the source document with the entry']
      },
      {
        title: 'Assets', unit: 'Accounting Foundations',
        goals: ['Define an asset in accounting terms', 'Classify common business assets', 'Calculate total assets from account balances'],
        vocabulary: [['Asset', 'An economic resource controlled by a business as a result of past events, expected to provide future benefit.'], ['Current asset', 'An asset expected to be used, sold, or converted to cash within the operating cycle or about one year.'], ['Accounts receivable', 'Amounts customers owe for goods or services already provided on credit.']],
        sections: [
          ['What qualifies as an asset?', 'A business asset is a resource the business controls because something has already happened, and the resource is expected to help the business in the future. Cash, receivables, supplies, inventory, and equipment are common examples. A valuable idea or a hoped-for customer is not automatically recorded as an asset.'],
          ['Current and long-term assets', 'Current assets are expected to turn into cash, be sold, or be used up soon. Long-term assets support operations for more than one period, such as equipment or a vehicle. Classification helps readers judge short-term flexibility separately from resources used over time.'],
          ['Measure and report', 'Use the account balance supported by records, not an informal estimate of what the whole business is worth. Add asset account balances to find total assets. Assets appear on the balance sheet and must equal liabilities plus owner’s equity.']
        ],
        examples: [{
          prompt: 'A business has $2,400 cash, $600 accounts receivable, $300 supplies, and $4,000 equipment. Find total assets.',
          steps: ['List the four asset balances: 2,400; 600; 300; 4,000.', 'Add them: 2,400 + 600 + 300 + 4,000 = 7,300.', 'Keep each amount in the business records and report the total at the statement date.'],
          answer: 'Total assets = $7,300.'
        }],
        questions: [
          ['A customer owes the business for completed work. Which asset records the amount?', ['Accounts payable', 'Accounts receivable', 'Owner’s drawings', 'Service expense'], 1, 'Accounts receivable is the business’s claim to collect cash from a customer.'],
          ['Which is generally a long-term asset?', ['Cash', 'Supplies expected to be used this month', 'Delivery equipment used for several years', 'A customer invoice due next week'], 2, 'Equipment used over several years supports operations beyond the near-term current-asset period.']
        ],
        mistakes: ['Calling every valuable item an asset even when the business does not control it.', 'Confusing accounts receivable (customers owe the business) with accounts payable (the business owes suppliers).'],
        summary: ['An asset is a controlled resource with expected future benefit.', 'Separate current assets from resources used over the longer term.', 'Total assets must balance with liabilities and owner’s equity.'],
        cheatSheet: ['Total assets = sum of asset account balances', 'A/R = customers owe the business', 'Assets = Liabilities + Owner’s Equity']
      },
      {
        title: 'Liabilities', unit: 'Accounting Foundations',
        goals: ['Explain why an obligation is a liability', 'Distinguish common liability accounts', 'Show how borrowing affects the accounting equation'],
        vocabulary: [['Liability', 'A present obligation of the business arising from a past event, expected to require a future transfer of resources.'], ['Accounts payable', 'Amounts owed to suppliers for goods or services received on credit.'], ['Current liability', 'An obligation expected to be settled within the operating cycle or about one year.']],
        sections: [
          ['An obligation already exists', 'A liability is more than a possible future expense: the business has a present duty because something already occurred. Receiving supplies on credit creates Accounts Payable. Borrowing creates a Loan Payable. Wages earned by employees but not yet paid create Wages Payable.'],
          ['Current and long-term obligations', 'Current liabilities are due soon, often within one year or the operating cycle. Longer-term loans are reported separately so readers can see which claims require near-term cash. The exact due date and loan terms matter when classifying a balance.'],
          ['Liabilities and the equation', 'Liabilities are claims against business assets by creditors. When a business borrows $5,000 cash, Cash and Loan Payable both increase $5,000. Paying back principal reduces cash and the liability; interest is a separate expense.']
        ],
        examples: [{
          prompt: 'A business receives $700 of supplies from a supplier and agrees to pay next month.',
          steps: ['The business has received and controls the supplies, so Supplies increases $700.', 'The unpaid supplier claim is Accounts Payable, which increases $700.', 'Both sides of the accounting equation increase by $700.'],
          answer: 'Debit-side effects: asset Supplies +$700; liability Accounts Payable +$700.'
        }],
        questions: [
          ['Which event creates a liability?', ['The owner plans to hire staff', 'Supplies arrive with payment due in 30 days', 'A customer pays cash for completed work', 'The owner contributes cash'], 1, 'The business received supplies and now has a present obligation to pay the supplier.'],
          ['A business repays $500 of loan principal in cash. What changes?', ['Cash and Loan Payable each decrease $500', 'Cash decreases and expense increases $500', 'Loan Payable increases $500', 'Owner’s Equity increases $500'], 0, 'Repaying principal reduces the asset Cash and the liability Loan Payable.']
        ],
        mistakes: ['Recording an unpaid supplier invoice as an expense without identifying the payable account.', 'Treating loan principal repayment as an expense; principal reduces the liability.'],
        summary: ['A liability is a present obligation from a past event.', 'Accounts payable, wages payable, and loans payable represent different obligations.', 'Borrowing increases cash and liabilities; principal repayment reduces both.'],
        cheatSheet: ['Current liability: due in the near term', 'Borrowing: Cash ↑ and Loan Payable ↑', 'Principal repayment ≠ expense']
      },
      {
        title: 'Owner’s equity', unit: 'Accounting Foundations',
        goals: ['Describe the owner’s residual claim', 'Distinguish owner investment, revenue, expenses, and drawings', 'Calculate ending owner’s equity'],
        vocabulary: [['Owner’s equity', 'The owner’s residual claim on business assets after liabilities are deducted.'], ['Revenue', 'Amounts earned by providing goods or services in the business’s ordinary activities.'], ['Drawings', 'Cash or other assets taken out of the business by the owner for personal use.']],
        sections: [
          ['Equity is the residual', 'Rearrange the accounting equation: Owner’s Equity = Assets − Liabilities. Equity is not the same as cash in the bank. A business can have positive equity and little cash, or cash and substantial debt.'],
          ['What changes equity?', 'Owner investment increases equity. Revenue earned increases equity; expenses incurred decrease it. Drawings reduce the owner’s claim but are not an operating expense. Profit is revenue minus expenses for the period.'],
          ['Track the period', 'For a sole proprietorship, ending capital can be calculated from beginning capital plus owner investments plus net income, minus drawings. Keep transactions separate so the statements can explain how the ending amount was reached.']
        ],
        examples: [{
          prompt: 'Beginning capital is $8,000. The owner invests $1,500, the business earns $4,200 revenue, incurs $2,700 expenses, and the owner withdraws $600. Find ending capital.',
          steps: ['Net income = revenue − expenses = $4,200 − $2,700 = $1,500.', 'Add beginning capital and investment: $8,000 + $1,500 + $1,500 = $11,000.', 'Subtract drawings: $11,000 − $600 = $10,400.'],
          answer: 'Ending owner’s capital = $10,400.'
        }],
        questions: [
          ['The owner takes $300 cash for personal use. How is it classified?', ['Rent expense', 'Drawings, which reduce equity', 'Revenue', 'Accounts receivable'], 1, 'A personal withdrawal is drawings, not a cost of earning business revenue.'],
          ['A business earns revenue on account. What is the effect when the service is completed?', ['Revenue and equity increase; accounts receivable increases', 'Cash and liabilities increase', 'Drawings increase', 'Expenses increase'], 0, 'The business has earned revenue and has a claim to collect from the customer.']
        ],
        mistakes: ['Treating drawings as an expense on the income statement.', 'Assuming owner’s equity is the same as the business’s cash balance.'],
        summary: ['Equity = assets − liabilities.', 'Revenue increases equity and expenses decrease it.', 'Drawings reduce equity but are not operating expenses.'],
        cheatSheet: ['Ending capital = beginning capital + investment + net income − drawings', 'Net income = revenue − expenses', 'Owner’s Equity = Assets − Liabilities']
      },
      {
        title: 'Journal entries', unit: 'Recording & Reporting',
        goals: ['Analyze a transaction before recording it', 'Apply debit and credit rules', 'Record a balanced journal entry with an explanation'],
        vocabulary: [['Journal', 'A chronological record of transactions.'], ['Debit', 'The left side of an account; its effect depends on account type.'], ['Credit', 'The right side of an account; its effect depends on account type.']],
        sections: [
          ['Debits and credits are sides, not good and bad', 'Every journal entry has total debits equal to total credits. Assets and expenses normally increase with debits. Liabilities, owner’s capital, and revenues normally increase with credits. A debit does not always mean increase, and a credit does not always mean decrease.'],
          ['Analyze before choosing accounts', 'Read the source document. Identify the accounts affected, the direction of each change, and the amount. Then apply the normal-balance rules and verify that total debits equal total credits. Date and explain the entry so another person can understand it.'],
          ['Accrual basis matters', 'Record revenue when it is earned and expense when it is incurred, not only when cash changes hands. For example, completing a service on credit creates revenue and Accounts Receivable now; collecting later settles the receivable.']
        ],
        examples: [{
          prompt: 'The business completes $900 of services for a customer who will pay later.',
          steps: ['Accounts Receivable is an asset and increases: debit $900.', 'Service Revenue increases equity and normally has a credit balance: credit $900.', 'Check: debits $900 = credits $900.'],
          answer: 'Dr Accounts Receivable $900; Cr Service Revenue $900.'
        }],
        questions: [
          ['A business pays $250 rent in cash. Which entry is correct?', ['Dr Cash 250; Cr Rent Expense 250', 'Dr Rent Expense 250; Cr Cash 250', 'Dr Accounts Payable 250; Cr Cash 250', 'Dr Cash 250; Cr Revenue 250'], 1, 'Rent Expense increases with a debit; Cash decreases with a credit.'],
          ['A journal entry has debits of $1,200 and credits of $1,050. What is true?', ['It is balanced because accounts differ', 'It is unbalanced by $150 and must be checked', 'It increases equity by $150', 'It is correct if cash is involved'], 1, 'Every entry must have equal total debits and credits; the $150 difference signals an error.']
        ],
        mistakes: ['Choosing debit or credit by whether cash is received, rather than by account type.', 'Recording only one side of a transaction.', 'Recording earned revenue only when the customer pays.'],
        summary: ['Analyze the transaction and identify every affected account.', 'Use normal-balance rules to choose debit or credit.', 'Prove total debits equal total credits before posting.'],
        cheatSheet: ['Assets and expenses increase with debits', 'Liabilities, capital, and revenue increase with credits', 'Every journal entry: total Dr = total Cr']
      },
      {
        title: 'Ledgers', unit: 'Recording & Reporting',
        goals: ['Distinguish a journal from a ledger', 'Post journal entries to the correct accounts', 'Calculate an account balance'],
        vocabulary: [['Ledger', 'The collection of individual accounts that groups transactions by account.'], ['Posting', 'Transferring a journal entry to the corresponding ledger accounts.'], ['Account balance', 'The net debit or credit remaining in an account after posting.']],
        sections: [
          ['From chronological to organized', 'The journal lists transactions by date. A ledger groups those same entries into Cash, Accounts Receivable, Revenue, and other accounts. This makes it possible to see the history and current balance of one account.'],
          ['Post both sides', 'For each journal entry, post the debit to the debit side of its ledger account and the credit to the credit side of its ledger account. Carry over the date and journal reference. Posting does not create a new transaction; it reorganizes the recorded transaction.'],
          ['Find the balance', 'Total the debit and credit columns for an account and subtract the smaller from the larger. The side with the larger total is the balance side. Compare that balance with the account’s normal balance and investigate unusual results.']
        ],
        examples: [{
          prompt: 'Cash has opening debit balance $1,000, then receives $600 and pays $250. Find its ending balance.',
          steps: ['Cash is an asset with a normal debit balance.', 'Debit total = $1,000 + $600 = $1,600.', 'Credit total = $250.', 'Subtract: $1,600 − $250 = $1,350 debit.'],
          answer: 'Ending Cash balance: $1,350 debit.'
        }],
        questions: [
          ['What is the main purpose of the ledger?', ['To list events in date order only', 'To group transactions by account and show balances', 'To replace source documents', 'To calculate taxes'], 1, 'The ledger organizes posted transactions by account.'],
          ['An asset account has debits of $2,000 and credits of $700. What is its balance?', ['$1,300 debit', '$1,300 credit', '$2,700 debit', '$700 debit'], 0, 'Subtract the smaller credit total from the debit total; the debit side remains larger.']
        ],
        mistakes: ['Posting only one side of an entry.', 'Treating posting as a second transaction.', 'Reporting the difference on the smaller side instead of the larger side.'],
        summary: ['The journal is chronological; the ledger is organized by account.', 'Post each debit and credit to its matching account.', 'The balance belongs on the side with the larger total.'],
        cheatSheet: ['Ledger balance = larger side total − smaller side total', 'Assets normally carry debit balances', 'Posting transfers; it does not create a new transaction']
      },
      {
        title: 'Trial balances', unit: 'Recording & Reporting',
        goals: ['Prepare a trial balance from ledger balances', 'Explain what equal totals do and do not prove', 'Locate common recording errors'],
        vocabulary: [['Trial balance', 'A list of ledger account balances with debit and credit columns whose totals should agree.'], ['Transposition error', 'An error caused by reversing digits, such as recording 54 as 45.'], ['Omission', 'A transaction or posting that was left out entirely.']],
        sections: [
          ['Prepare the list', 'At a chosen date, copy each ledger account’s ending balance into the debit or credit column according to its balance side. Add both columns. Equal totals are a useful arithmetic check before preparing statements.'],
          ['Equality is not proof of correctness', 'A trial balance can still agree if a transaction was omitted, recorded in the wrong accounts for equal amounts, or entered twice. It can also agree after a complete journal entry was posted to the wrong account. Supporting documents and account review are still needed.'],
          ['Search systematically', 'If totals differ, verify the addition first, then compare the difference with common error clues. A difference divisible by 9 may indicate a transposition; a difference divisible by 2 may indicate a one-sided posting. Recheck ledger balances and trace the journal entry rather than inserting a plug.']
        ],
        examples: [{
          prompt: 'A trial balance shows total debits $18,430 and total credits $18,340. What is the difference and what should be checked first?',
          steps: ['Subtract: $18,430 − $18,340 = $90.', 'Confirm column addition and that every balance was copied to the correct side.', 'Trace entries and postings for $90 or a related digit error; do not force the totals to agree with an unexplained account.'],
          answer: 'The debit total exceeds credits by $90. Recheck arithmetic, sides, and postings.'
        }],
        questions: [
          ['A trial balance agrees. Which error could still exist?', ['A debit posted without its credit', 'A transaction omitted entirely', 'Debits added incorrectly by $100', 'A credit balance placed in the debit column'], 1, 'An omitted transaction leaves both columns unchanged, so they can still agree.'],
          ['Debits exceed credits by $180. What is the best response?', ['Add $180 to revenue', 'Force the difference into cash', 'Trace the difference through totals, balances, and postings', 'Ignore it if the business is profitable'], 2, 'A difference is evidence of an error to locate, not a reason to invent a balancing entry.']
        ],
        mistakes: ['Believing equal totals prove every transaction is correct.', 'Using a suspense or plug amount without investigating the difference.'],
        summary: ['The trial balance checks equality of debit and credit balances.', 'It does not detect every type of error.', 'Investigate the difference and trace entries to evidence.'],
        cheatSheet: ['Trial balance: total debits = total credits', 'Equality is necessary, not sufficient, for accuracy', 'Never plug an unexplained difference']
      },
      {
        title: 'Financial statements', unit: 'Recording & Reporting',
        goals: ['Explain what the main statements report', 'Prepare statements in the correct sequence', 'Connect net income and ending capital to the balance sheet'],
        vocabulary: [['Income statement', 'Reports revenue and expenses over a period to calculate net income or net loss.'], ['Statement of owner’s equity', 'Explains changes in the owner’s capital during a period.'], ['Balance sheet', 'Reports assets, liabilities, and owner’s equity at a specific date.']],
        sections: [
          ['Different questions, different statements', 'The income statement answers whether operations earned a profit over a period: revenue minus expenses. The owner’s equity statement explains capital changes. The balance sheet shows the business’s financial position at one date. Do not mix a period with a date.'],
          ['Prepare in sequence', 'Prepare the income statement first to find net income. Use that result on the owner’s equity statement to calculate ending capital. Then report assets, liabilities, and ending capital on the balance sheet. The accounting equation must balance.'],
          ['Read results with context', 'A positive net income does not guarantee positive cash flow or easy bill payment. Revenue can be earned on credit, and cash can be spent on assets rather than expenses. Use the statements together and compare periods before drawing conclusions.']
        ],
        examples: [{
          prompt: 'Revenue is $12,000 and expenses are $8,500. Beginning capital is $5,000, owner investment is $1,000, and drawings are $700. Find net income and ending capital.',
          steps: ['Net income = revenue − expenses = $12,000 − $8,500 = $3,500.', 'Ending capital = $5,000 + $1,000 + $3,500 − $700.', 'Calculate: $5,000 + $1,000 + $3,500 − $700 = $8,800.'],
          answer: 'Net income: $3,500. Ending capital: $8,800.'
        }],
        questions: [
          ['Which statement reports assets and liabilities on a specific date?', ['Income statement', 'Statement of owner’s equity', 'Balance sheet', 'General journal'], 2, 'The balance sheet reports financial position at a point in time.'],
          ['Where does net income flow in a sole proprietorship’s statements?', ['From the income statement to the owner’s equity statement', 'Directly to accounts payable', 'From the balance sheet to revenue', 'It is never reported in equity'], 0, 'Net income increases owner’s capital and is used in the owner’s equity statement.']
        ],
        mistakes: ['Describing the balance sheet as covering a month or year; it is for a specific date.', 'Treating net income as cash.', 'Preparing the balance sheet before calculating ending capital.'],
        summary: ['Income statement: performance over a period.', 'Owner’s equity statement: changes in capital over a period.', 'Balance sheet: position at a date; it must balance.'],
        cheatSheet: ['Net income = Revenue − Expenses', 'Ending capital = beginning capital + investment + net income − drawings', 'Assets = Liabilities + Owner’s Equity']
      },
      {
        title: 'Internal controls', unit: 'Analysis & Ethics',
        goals: ['Explain why businesses use internal controls', 'Choose controls that reduce specific risks', 'Recognize that controls reduce but do not eliminate risk'],
        vocabulary: [['Internal control', 'A policy or procedure designed to protect assets, improve record reliability, and support compliance.'], ['Segregation of duties', 'Dividing authorization, custody, and recordkeeping among different people where practical.'], ['Reconciliation', 'Comparing two independent records and investigating differences.']],
        sections: [
          ['Match a control to a risk', 'Controls protect cash and other assets, help make records reliable, and support lawful operations. If one person can approve payments, handle cash, and alter the records, errors or fraud may be harder to detect. Divide those duties when staffing permits.'],
          ['Use layered safeguards', 'Examples include approval limits, numbered invoices, locked cash storage, restricted system access, regular bank reconciliations, and independent review. A control should address a specific risk and leave evidence that it operated.'],
          ['Know the limits', 'Controls provide reasonable, not absolute, assurance. People can collude, override a procedure, make mistakes, or face a control that is too costly or poorly designed. Review exceptions promptly and update controls when the business changes.']
        ],
        examples: [{
          prompt: 'One employee receives customer cash, records payments, and reconciles the bank account. Identify the risk and one improvement.',
          steps: ['The same person has custody, recordkeeping, and review duties.', 'An error or missing deposit could be concealed in the records.', 'Assign bank reconciliation to another person or require an independent documented review.'],
          answer: 'Separate cash handling from recording/reconciliation, or add an independent review.'
        }],
        questions: [
          ['Why is segregation of duties useful?', ['It guarantees no fraud can occur', 'It makes one person responsible for every step', 'It makes errors or misuse harder to conceal', 'It removes the need for records'], 2, 'Separating responsibilities reduces the opportunity for one person to make and hide an error.'],
          ['Which is a detective control?', ['A locked cash drawer', 'A bank reconciliation reviewed monthly', 'A password shared by all staff', 'Removing transaction numbers'], 1, 'Reconciliation can detect differences after transactions have been recorded.']
        ],
        mistakes: ['Assuming controls eliminate all fraud or error.', 'Adding a control without identifying the risk it is meant to reduce.'],
        summary: ['Controls protect assets and improve record reliability.', 'Separate duties and use independent checks where practical.', 'Controls reduce risk; they do not provide certainty.'],
        cheatSheet: ['Preventive: restrict or authorize', 'Detective: reconcile and review', 'Document exceptions and follow up']
      },
      {
        title: 'Interpreting results', unit: 'Analysis & Ethics',
        goals: ['Read financial results in context', 'Compare performance across periods', 'Distinguish profitability from liquidity and cash'],
        vocabulary: [['Profitability', 'The ability to earn revenue in excess of expenses over a period.'], ['Liquidity', 'The ability to meet obligations that are due soon.'], ['Trend analysis', 'Comparing the same measure across periods to identify changes.']],
        sections: [
          ['Ask what the number measures', 'Net income measures revenue less expenses over a period. Cash is an asset at a date. A business can report profit and still have a cash shortage if customers have not paid or bills are due soon. A single number never answers every question.'],
          ['Compare like with like', 'Compare the same measure across periods, and check whether accounting methods, seasonality, and business size are comparable. A rise in revenue may be positive, but if expenses rise faster, net income can fall. Read the notes and underlying accounts before inferring a cause.'],
          ['Use more than one signal', 'Profitability and short-term liquidity answer different questions. For example, current assets compared with current liabilities can inform short-term payment capacity, but the quality and timing of those assets matter. Explain what evidence supports a conclusion and what remains uncertain.']
        ],
        examples: [{
          prompt: 'Revenue rises from $20,000 to $24,000, while expenses rise from $17,000 to $22,000. What happened to net income?',
          steps: ['Earlier net income = $20,000 − $17,000 = $3,000.', 'Later net income = $24,000 − $22,000 = $2,000.', 'Revenue rose by $4,000, but expenses rose by $5,000, so net income fell by $1,000.'],
          answer: 'Net income decreased from $3,000 to $2,000.'
        }],
        questions: [
          ['A business reports positive net income but has little cash. Which explanation is possible?', ['All revenue was collected immediately', 'Customers owe significant accounts receivable', 'The business has no assets', 'Net income is the cash balance'], 1, 'Credit sales can increase revenue and receivables without increasing cash yet.'],
          ['Which comparison is most useful for identifying a trend?', ['This year’s rent expense versus last year’s rent expense, with context', 'Revenue versus the owner’s home value', 'One month’s sales versus a competitor’s annual sales', 'A total without a date'], 0, 'A like-for-like comparison across periods supports trend interpretation.']
        ],
        mistakes: ['Treating net income as the cash balance.', 'Claiming a cause from a trend without checking transactions or context.'],
        summary: ['Profitability, liquidity, and cash are related but different.', 'Compare like measures across comparable periods.', 'Explain conclusions using evidence and acknowledge limits.'],
        cheatSheet: ['Net income = revenue − expenses', 'Liquidity concerns near-term obligations', 'A trend suggests a question; it does not prove a cause']
      },
      {
        title: 'Professional ethics', unit: 'Analysis & Ethics',
        goals: ['Apply integrity and objectivity to accounting decisions', 'Identify conflicts of interest and pressure to misreport', 'Choose a responsible next step when records appear wrong'],
        vocabulary: [['Integrity', 'Being honest and straightforward, including when information is inconvenient.'], ['Objectivity', 'Making judgments using evidence without allowing bias or pressure to distort them.'], ['Confidentiality', 'Protecting information obtained through work and using it only for authorized purposes.']],
        sections: [
          ['Why ethics matters', 'Owners, employees, lenders, suppliers, and governments make decisions using accounting information. Deliberately changing dates, omitting liabilities, or recording revenue before it is earned can mislead those users and cause real harm. A balanced entry is not automatically an ethical or truthful entry.'],
          ['Use evidence and disclose uncertainty', 'Choose classifications and estimates consistently, support them with documents, and disclose material uncertainty through the appropriate reporting process. Do not alter source documents or hide a known error to meet a target. Ask for clarification when the accounting treatment is unclear.'],
          ['Respond to pressure responsibly', 'Preserve relevant records, explain the accounting concern factually, and use the organization’s reporting or escalation channel. Do not share confidential information outside authorized channels. If pressured to make a misleading entry, seek guidance from a qualified supervisor or professional body.']
        ],
        examples: [{
          prompt: 'A manager asks an employee to record next month’s service revenue this month to meet a target. What is the ethical accounting response?',
          steps: ['Revenue is recorded when it is earned, not merely when someone wants a target met.', 'Ask whether the service has actually been provided and review the supporting contract or work record.', 'Do not make an unsupported entry; explain the concern and use the proper escalation channel if pressure continues.'],
          answer: 'Record revenue only when earned and supported; document and escalate pressure to misstate it.'
        }],
        questions: [
          ['A colleague finds a material posting error just before a report is issued. What is the best first response?', ['Delete the source document', 'Ignore it because the report is nearly complete', 'Preserve the evidence and report the error through the proper channel', 'Change an unrelated balance to offset it'], 2, 'An error should be investigated and corrected transparently using supporting evidence.'],
          ['Which action violates confidentiality?', ['Sharing a report with an authorized reviewer', 'Discussing a client’s financial details in a public place', 'Keeping records in an access-controlled system', 'Asking a supervisor about an accounting treatment'], 1, 'Sensitive financial information should not be disclosed to unauthorized people.']
        ],
        mistakes: ['Assuming a balanced entry must be accurate or ethical.', 'Changing records to satisfy a target without evidence.', 'Sharing confidential data with people who do not need authorized access.'],
        summary: ['Use integrity, objectivity, and evidence in accounting judgments.', 'Do not conceal known errors or create unsupported entries.', 'Protect confidential information and use proper escalation channels.'],
        cheatSheet: ['Evidence before entry', 'Do not knowingly misstate records', 'Protect confidentiality; disclose through authorized channels']
      }
    ],
    accounting12: [
      {
        title: 'Adjusting entries', unit: 'Financial Reporting',
        goals: ['Explain why accounts are adjusted at period end', 'Record common deferrals and accruals', 'Keep adjusting entries separate from cash payments'],
        vocabulary: [['Adjusting entry', 'A period-end entry that updates revenue or expense and a related asset or liability under accrual accounting.'], ['Deferral', 'Cash is received or paid before the related revenue is earned or expense is incurred.'], ['Accrual', 'Revenue is earned or an expense is incurred before cash is received or paid.']],
        sections: [
          ['Match activity to the period', 'Accrual accounting reports revenue when earned and expense when incurred. At period end, some account balances need updating even though no new cash transaction occurred. Adjusting entries make the statements reflect what was earned or used during the period.'],
          ['Deferrals', 'A prepayment begins as an asset, then becomes an expense as it is used. A customer payment received in advance begins as a liability, then becomes revenue as service is delivered. Adjust only the portion that belongs to the current period.'],
          ['Accruals', 'Accrued expenses such as wages owed are recorded before payment. Accrued revenue such as completed work not yet billed is recorded before collection. Each adjustment updates one income-statement account and one balance-sheet account.']
        ],
        examples: [{
          prompt: 'On October 1, a business prepays $1,200 for 12 months of insurance. Record the October 31 adjustment.',
          steps: ['Monthly insurance cost = $1,200 ÷ 12 = $100.', 'One month of coverage has expired, so Insurance Expense increases $100.', 'Prepaid Insurance, an asset, decreases $100.'],
          answer: 'Dr Insurance Expense $100; Cr Prepaid Insurance $100.'
        }],
        questions: [
          ['What is the purpose of an adjusting entry?', ['To record every future plan', 'To update revenue, expense, asset, or liability balances for the period', 'To replace the trial balance', 'To record only cash receipts'], 1, 'Adjusting entries apply accrual accounting at period end.'],
          ['A customer pays in advance for work not yet performed. Before the work is done, the amount is generally:', ['Earned revenue', 'A liability for unearned revenue', 'An expense', 'Owner’s drawings'], 1, 'The business still owes the customer goods or services.']
        ],
        mistakes: ['Adjusting for the full prepayment instead of only the amount used.', 'Treating a customer advance as earned revenue before providing the service.', 'Assuming an adjusting entry must involve cash.'],
        summary: ['Adjusting entries apply accrual accounting at period end.', 'Deferrals move prepaid or unearned amounts into the period as earned or used.', 'Accruals record earned revenue or incurred expenses before cash moves.'],
        cheatSheet: ['Expired prepayment: Dr Expense, Cr Asset', 'Revenue earned from advance: Dr Liability, Cr Revenue', 'Accruals often have no period-end cash entry']
      },
      {
        title: 'Accruals', unit: 'Financial Reporting',
        goals: ['Identify accrued revenue and accrued expense', 'Record the adjusting entry for an unpaid or uncollected amount', 'Explain the financial-statement effects'],
        vocabulary: [['Accrued expense', 'An expense already incurred but not yet paid or recorded.'], ['Accrued revenue', 'Revenue already earned but not yet collected or recorded.'], ['Accrued liability', 'An obligation recognized for an expense incurred by period end.']],
        sections: [
          ['Accrued expenses', 'If employees have worked by the reporting date but payday is later, the wages belong to the current period. Debit Wages Expense and credit Wages Payable. The later payment reduces cash and the payable; it is not a second wages expense for the already accrued amount.'],
          ['Accrued revenue', 'If a business has completed work but has not yet billed or collected, it has earned revenue and has a receivable. Debit Accounts Receivable and credit Revenue. Collection later converts the receivable to cash.'],
          ['Use the cutoff date', 'Ask what work was completed or what resource was used by the reporting date. Use time records, contracts, usage records, or invoices to measure the amount. Recognize only the portion belonging to the current period.']
        ],
        examples: [{
          prompt: 'Employees have earned $480 of wages by December 31; they will be paid January 5.',
          steps: ['The work was performed before year-end, so the expense belongs in the current period.', 'Wages Expense increases $480 with a debit.', 'Wages Payable increases $480 with a credit until payment.'],
          answer: 'December 31: Dr Wages Expense $480; Cr Wages Payable $480.'
        }],
        questions: [
          ['A consultant completes $900 of work by month-end and will invoice next month. What is recorded now?', ['Cash and revenue', 'Accounts Receivable and revenue', 'Accounts Payable and expense', 'No entry until cash arrives'], 1, 'The service has been earned, creating revenue and a receivable.'],
          ['When the $480 accrued wages are paid in January, what happens to the previously recorded payable?', ['It is debited and Cash is credited', 'It is credited again', 'Revenue is debited', 'Owner’s capital is credited'], 0, 'Payment settles the liability: debit Wages Payable and credit Cash.']
        ],
        mistakes: ['Waiting for cash to record earned revenue or incurred expenses.', 'Recording an accrued amount again as a new expense when it is paid.'],
        summary: ['Recognize work completed and resources used by the reporting date.', 'Accrued expenses create payables; accrued revenue creates receivables.', 'Later settlement clears the balance-sheet account.'],
        cheatSheet: ['Accrued expense: Dr Expense, Cr Payable', 'Accrued revenue: Dr Receivable, Cr Revenue', 'Payment/collection settles the balance; it does not re-earn/re-incur it']
      },
      {
        title: 'Financial statement preparation', unit: 'Financial Reporting',
        goals: ['Use adjusted balances to prepare statements', 'Prepare income and equity results before the balance sheet', 'Check that statements agree with the accounting equation'],
        vocabulary: [['Adjusted trial balance', 'A list of account balances after adjusting entries, used to prepare financial statements.'], ['Temporary account', 'An income-statement account closed at period end so the next period starts fresh.'], ['Permanent account', 'A balance-sheet account carried forward into the next period.']],
        sections: [
          ['Start from adjusted balances', 'Post and verify adjusting entries, then prepare an adjusted trial balance. Use those balances as the source for statements; do not mix pre-adjustment amounts with adjusted amounts.'],
          ['Follow the dependency order', 'Calculate revenue less expenses on the income statement. Carry net income or loss into the owner’s equity statement, including investments and drawings. Use ending capital on the balance sheet with assets and liabilities.'],
          ['Review consistency', 'The balance sheet must satisfy Assets = Liabilities + Owner’s Equity. Net income should agree between the income statement and equity statement. Each statement should show the correct period or date and clearly label its units.']
        ],
        examples: [{
          prompt: 'A sole proprietorship has assets $18,000, liabilities $6,500, beginning capital $9,000, investment $1,000, net income $2,000, and drawings $500.',
          steps: ['Ending capital = $9,000 + $1,000 + $2,000 − $500 = $11,500.', 'Check the balance sheet equation: liabilities + capital = $6,500 + $11,500 = $18,000.', 'The reported assets equal the claims against those assets.'],
          answer: 'Ending capital is $11,500; the balance sheet balances at $18,000.'
        }],
        questions: [
          ['Which figure is needed from the income statement to prepare the owner’s equity statement?', ['Net income or loss', 'Accounts receivable only', 'Ending cash only', 'Total liabilities'], 0, 'Net income or loss changes owner’s capital for the period.'],
          ['A balance sheet has assets of $25,000 and liabilities of $9,000. What must owner’s equity be?', ['$34,000', '$16,000', '$9,000', '$25,000'], 1, 'Owner’s equity = assets − liabilities = $25,000 − $9,000 = $16,000.']
        ],
        mistakes: ['Preparing statements from unadjusted balances.', 'Using beginning capital instead of ending capital on the balance sheet.', 'Reporting a balance sheet that does not balance without investigating.'],
        summary: ['Use the adjusted trial balance.', 'Prepare the income statement, equity statement, then balance sheet.', 'Check net income flow and the accounting equation.'],
        cheatSheet: ['Net income flows into owner’s equity', 'Ending capital flows to the balance sheet', 'Assets = Liabilities + Owner’s Equity']
      },
      {
        title: 'Inventory', unit: 'Merchandising & Assets',
        goals: ['Explain inventory as an asset held for sale', 'Distinguish inventory on hand from inventory cost sold', 'Describe how a count supports the recorded balance'],
        vocabulary: [['Merchandise inventory', 'Goods a business owns and holds for resale to customers.'], ['Inventory count', 'A physical count or other verification of goods on hand at a specified date.'], ['Cost flow assumption', 'A method for assigning recorded costs to goods sold and goods remaining.']],
        sections: [
          ['Inventory is a current asset', 'A retailer’s inventory consists of goods it owns for resale. Goods held on consignment may belong to another party; goods in transit depend on ownership terms. The business should not count items merely because they are physically nearby.'],
          ['Separate goods sold from goods on hand', 'When inventory is sold, its cost moves from the Inventory asset to Cost of Goods Sold expense. The selling price is revenue; the purchase cost is a separate amount. A sale therefore affects both revenue and inventory cost.'],
          ['Verify quantity and valuation', 'A physical count checks whether recorded quantities agree with goods on hand. Investigate shortages, damage, cutoff errors, and ownership. Inventory is reported at an appropriate cost-based amount under the method and rules used by the business; estimates and methods should be applied consistently.']
        ],
        examples: [{
          prompt: 'The records show 120 units at $8 each, but a physical count finds 116 saleable units. What quantity difference should be investigated?',
          steps: ['Recorded quantity: 120 units.', 'Counted saleable quantity: 116 units.', 'Difference: 120 − 116 = 4 units. Review receiving, sales, damage, and count records before adjusting.'],
          answer: 'Investigate a shortage of 4 units, with recorded cost of $32 if all units have the same $8 cost.'
        }],
        questions: [
          ['A retailer sells an item for $50 that cost $30. Which statement is correct?', ['Revenue is $30 and inventory is $50', 'Revenue is $50 and cost of goods sold is $30', 'Revenue is $20 only', 'Inventory increases by $50'], 1, 'The selling price is revenue; the item’s recorded cost becomes cost of goods sold.'],
          ['Why conduct a physical inventory count?', ['To decide next year’s sales price only', 'To verify quantities and investigate differences from records', 'To replace the journal', 'To guarantee no theft occurred'], 1, 'A count can identify discrepancies but does not by itself explain their cause.']
        ],
        mistakes: ['Recording a sale only at its selling price and forgetting the inventory cost effect.', 'Assuming every item physically present is owned by the business.'],
        summary: ['Inventory is goods owned for resale.', 'A sale affects revenue and the cost of inventory sold.', 'Counts verify quantities; investigate differences and ownership.'],
        cheatSheet: ['Sale price → revenue', 'Recorded cost → Cost of Goods Sold', 'Inventory count difference → investigate, then support any adjustment']
      },
      {
        title: 'Cost of goods sold', unit: 'Merchandising & Assets',
        goals: ['Calculate cost of goods sold under a periodic system', 'Distinguish purchases from inventory remaining', 'Interpret gross profit using revenue and cost'],
        vocabulary: [['Cost of goods sold (COGS)', 'The recorded cost of inventory sold during a period.'], ['Net purchases', 'Purchases adjusted for purchase returns, allowances, and discounts under the system used.'], ['Gross profit', 'Sales revenue minus cost of goods sold, before other operating expenses.']],
        sections: [
          ['Match inventory cost to sales', 'Cost of goods sold is the cost assigned to merchandise that left inventory through sales. It is not the selling price and is not the same as all cash paid to suppliers during the period.'],
          ['Use the periodic-system relationship', 'Under a periodic inventory system, calculate goods available for sale as beginning inventory plus net purchases and related costs included by the method. Subtract ending inventory to find COGS. The ending amount must be supported by a count and valuation.'],
          ['Calculate gross profit', 'Gross profit = net sales − COGS. It shows the amount remaining to cover operating expenses and other costs. A higher gross profit does not necessarily mean a higher net income; rent, wages, and other expenses still matter.']
        ],
        examples: [{
          prompt: 'Beginning inventory is $2,000, net purchases are $8,000, and ending inventory is $1,500. Find COGS.',
          steps: ['Goods available for sale = beginning inventory + net purchases = $2,000 + $8,000 = $10,000.', 'Subtract ending inventory: $10,000 − $1,500 = $8,500.'],
          answer: 'Cost of goods sold = $8,500.'
        }],
        questions: [
          ['Beginning inventory is $3,200, purchases are $10,000, and ending inventory is $2,700. What is COGS?', ['$10,500', '$15,900', '$8,000', '$2,700'], 0, 'COGS = $3,200 + $10,000 − $2,700 = $10,500.'],
          ['Sales are $15,000 and COGS is $9,000. What is gross profit?', ['$24,000', '$6,000', '$9,000', '$15,000'], 1, 'Gross profit = sales − COGS = $15,000 − $9,000 = $6,000.']
        ],
        mistakes: ['Subtracting purchases from sales instead of calculating inventory cost sold.', 'Forgetting to subtract ending inventory in the periodic formula.', 'Calling gross profit net income.'],
        summary: ['COGS is the cost assigned to inventory sold.', 'Periodic formula: beginning inventory + net purchases − ending inventory.', 'Gross profit is before operating expenses.'],
        cheatSheet: ['COGS = BI + Net Purchases − EI', 'Gross Profit = Net Sales − COGS', 'EI is supported by count and valuation']
      },
      {
        title: 'Depreciation', unit: 'Merchandising & Assets',
        goals: ['Explain depreciation as systematic cost allocation', 'Calculate straight-line depreciation', 'Distinguish accumulated depreciation from an asset’s cost and cash value'],
        vocabulary: [['Depreciation', 'Systematic allocation of a tangible long-term asset’s depreciable cost over its useful life.'], ['Residual value', 'Estimated amount expected from disposing of an asset at the end of its useful life.'], ['Accumulated depreciation', 'The total depreciation expense recorded on an asset since it was placed in service.']],
        sections: [
          ['Allocate cost over useful life', 'A long-term asset helps earn revenue over multiple periods. Depreciation allocates its depreciable cost to those periods. It is not a periodic estimate of market value and does not directly set aside cash.'],
          ['Straight-line method', 'Estimate useful life and residual value. Depreciable cost is cost minus residual value. Divide by the useful life to find equal annual depreciation, assuming a full year and no change in estimates.'],
          ['Report carrying amount', 'Record depreciation expense and accumulated depreciation. Accumulated depreciation is a contra-asset that reduces the asset’s carrying amount on the balance sheet. The asset’s original cost remains visible, and cash changes only when cash is paid or received.']
        ],
        examples: [{
          prompt: 'Equipment costs $12,000, has estimated residual value $2,000, and useful life 5 years. Find annual straight-line depreciation.',
          steps: ['Depreciable cost = cost − residual value = $12,000 − $2,000 = $10,000.', 'Annual depreciation = $10,000 ÷ 5 = $2,000.', 'For a full year, record $2,000 expense and increase accumulated depreciation by $2,000.'],
          answer: 'Annual straight-line depreciation = $2,000.'
        }],
        questions: [
          ['What does depreciation primarily represent?', ['A cash reserve for replacing the asset', 'Allocation of depreciable cost over useful life', 'The asset’s current selling price', 'A reduction of the original purchase cost in cash'], 1, 'Depreciation is an accounting allocation, not a cash fund or market valuation.'],
          ['Cost is $9,000, residual value $1,000, useful life 4 years. What is annual straight-line depreciation?', ['$2,000', '$2,250', '$1,000', '$8,000'], 0, '($9,000 − $1,000) ÷ 4 = $2,000 per year.']
        ],
        mistakes: ['Depreciating the full cost when a residual value is estimated.', 'Treating depreciation as a cash payment or the current market price.', 'Subtracting accumulated depreciation from cost twice.'],
        summary: ['Depreciation allocates depreciable cost over useful life.', 'Straight-line expense = (cost − residual value) ÷ useful life.', 'Accumulated depreciation reduces carrying amount; it is not cash.'],
        cheatSheet: ['Annual straight-line depreciation = (Cost − Residual Value) ÷ Useful Life', 'Carrying amount = Cost − Accumulated Depreciation', 'Depreciation expense ≠ cash outflow']
      },
      {
        title: 'Asset disposal', unit: 'Merchandising & Assets',
        goals: ['Calculate an asset’s carrying amount at disposal', 'Record proceeds and remove the asset accounts', 'Determine a gain or loss on disposal'],
        vocabulary: [['Carrying amount', 'Asset cost less accumulated depreciation at a particular date.'], ['Gain on disposal', 'Proceeds received in excess of the asset’s carrying amount.'], ['Loss on disposal', 'Carrying amount in excess of proceeds received.']],
        sections: [
          ['Update depreciation first', 'Before disposal, record depreciation through the disposal date if required by the accounting policy. Then calculate carrying amount: cost less accumulated depreciation. Compare proceeds with this updated amount.'],
          ['Remove all asset balances', 'A disposal removes the asset’s original cost and its accumulated depreciation from the books. Record cash or receivable proceeds. The difference between proceeds and carrying amount is a gain or loss, not sales revenue from ordinary inventory.'],
          ['Check the entry', 'The debit and credit totals must agree. If proceeds exceed carrying amount, credit a gain; if proceeds are lower, debit a loss. If equal, there is no gain or loss. Keep the sale document and depreciation calculation with the entry.']
        ],
        examples: [{
          prompt: 'Equipment cost $10,000 with accumulated depreciation $7,000 is sold for $3,200 cash. Record the disposal.',
          steps: ['Carrying amount = $10,000 − $7,000 = $3,000.', 'Cash proceeds of $3,200 exceed carrying amount by $200, so record a $200 gain.', 'Remove accumulated depreciation with a $7,000 debit and remove Equipment cost with a $10,000 credit.', 'Check: debits $3,200 + $7,000 = $10,200; credits $10,000 + $200 = $10,200.'],
          answer: 'Dr Cash $3,200; Dr Accumulated Depreciation $7,000; Cr Equipment $10,000; Cr Gain on Disposal $200.'
        }],
        questions: [
          ['An asset has carrying amount $4,500 and is sold for $4,000. What results?', ['$500 gain', '$500 loss', 'No gain or loss', '$4,000 revenue'], 1, 'Proceeds are $500 below carrying amount, so the disposal produces a $500 loss.'],
          ['What must be removed from the accounts when equipment is disposed of?', ['Only its accumulated depreciation', 'Its cost and related accumulated depreciation', 'Only the cash received', 'The owner’s capital account'], 1, 'Remove both the asset’s cost and its accumulated depreciation, then record proceeds and gain or loss.']
        ],
        mistakes: ['Comparing sale proceeds with original cost instead of carrying amount.', 'Leaving accumulated depreciation on the books after removing the asset.', 'Recording a gain as ordinary sales revenue.'],
        summary: ['Update depreciation and calculate carrying amount first.', 'Remove asset cost and accumulated depreciation.', 'Proceeds minus carrying amount determine gain or loss.'],
        cheatSheet: ['Carrying Amount = Cost − Accumulated Depreciation', 'Proceeds > carrying amount → gain', 'Proceeds < carrying amount → loss']
      },
      {
        title: 'Financial statement analysis', unit: 'Analysis & Controls',
        goals: ['Calculate and interpret basic financial ratios', 'Compare results across time or with a relevant benchmark', 'State limits before drawing a conclusion'],
        vocabulary: [['Current ratio', 'Current assets divided by current liabilities; a measure related to short-term liquidity.'], ['Gross profit margin', 'Gross profit divided by net sales, often expressed as a percentage.'], ['Comparability', 'The extent to which figures are prepared on a basis that supports meaningful comparison.']],
        sections: [
          ['Choose a question before a ratio', 'Liquidity asks whether near-term obligations can be met. Profitability asks how effectively sales produce profit. Ratios summarize relationships, but their meaning depends on the business, timing, accounting methods, and quality of the underlying balances.'],
          ['Calculate consistently', 'Current ratio = current assets ÷ current liabilities. Gross profit margin = gross profit ÷ net sales × 100%. Use figures from the same period and preserve units. Compare with prior periods or a suitable industry benchmark, not an unrelated organization.'],
          ['Interpret, do not overclaim', 'A higher current ratio may indicate more short-term resources relative to obligations, but slow-moving inventory or overdue receivables may limit available cash. A falling gross margin may reflect price changes, cost increases, or sales mix. Ratios flag questions; investigate account details before claiming a cause.']
        ],
        examples: [{
          prompt: 'Current assets are $18,000 and current liabilities are $12,000. Calculate the current ratio and explain it.',
          steps: ['Current ratio = current assets ÷ current liabilities.', '$18,000 ÷ $12,000 = 1.5.', 'At this reporting date, the business has $1.50 of current assets per $1 of current liabilities; this alone does not guarantee payment ability.'],
          answer: 'Current ratio = 1.5:1, subject to the quality and timing of current assets.'
        }],
        questions: [
          ['Net sales are $40,000 and gross profit is $12,000. What is gross profit margin?', ['30%', '3.3%', '70%', '12%'], 0, '$12,000 ÷ $40,000 × 100% = 30%.'],
          ['A current ratio rises. What is the most responsible conclusion?', ['The business is guaranteed to pay every bill', 'Short-term assets are higher relative to short-term liabilities; investigate asset quality and timing', 'Profit must have increased', 'Cash doubled'], 1, 'The ratio indicates a relationship, not a guarantee or a complete explanation.']
        ],
        mistakes: ['Treating any ratio as a guaranteed outcome.', 'Comparing organizations without checking methods, industries, or time periods.', 'Confusing gross profit margin with net profit margin.'],
        summary: ['Ratios answer specific questions about financial relationships.', 'Use consistent periods and relevant comparisons.', 'Explain limitations and investigate causes in the underlying accounts.'],
        cheatSheet: ['Current Ratio = Current Assets ÷ Current Liabilities', 'Gross Profit Margin = Gross Profit ÷ Net Sales × 100%', 'A ratio is evidence to interpret, not a guarantee']
      },
      {
        title: 'Internal controls', unit: 'Analysis & Controls',
        goals: ['Evaluate controls over inventory, cash, and accounting records', 'Match a control to a specific risk', 'Describe how independent review strengthens reliability'],
        vocabulary: [['Authorization', 'Approval by a person with appropriate responsibility before a transaction proceeds.'], ['Segregation of duties', 'Separating authorization, custody, and recordkeeping to reduce error or concealment risk.'], ['Audit trail', 'Linked records that allow a transaction to be traced from source evidence through reports.']],
        sections: [
          ['Protect inventory and cash', 'Restrict physical access, record receipts and issues promptly, use numbered documents, and investigate count differences. For cash, separate receiving, depositing, recording, and reconciliation where practical. These measures reduce opportunities for loss and improve detection.'],
          ['Build an audit trail', 'A reliable record connects the source document to the journal, ledger, and financial statement. Consistent account codes, dates, approvals, and references help another person retrace the transaction and identify where an error occurred.'],
          ['Review exceptions independently', 'A supervisor or person independent of the original transaction should review reconciliations, unusual entries, and adjustments. Document the review and follow up on discrepancies. A control can fail through override, collusion, or poor design, so controls need ongoing review.']
        ],
        examples: [{
          prompt: 'Inventory records show 240 units, but the count finds 232. Design a control response.',
          steps: ['Document the count and preserve the original records.', 'Recount or verify units, cutoff, damage, and receiving/shipping documents.', 'Have someone independent review the difference and investigate the cause.', 'Post an adjustment only when supported and authorized; change procedures if the cause is recurring.'],
          answer: 'Recount, reconcile to source documents, investigate and independently review, then authorize a supported adjustment.'
        }],
        questions: [
          ['Which procedure creates a useful audit trail?', ['Delete source documents after posting', 'Link approved invoices to journal entries and ledger references', 'Allow shared passwords', 'Use unnumbered cash receipts'], 1, 'Linked, retained records let reviewers trace an entry back to evidence.'],
          ['Why should a reconciler be independent of cash handling?', ['To prevent all possible errors', 'To make differences harder to conceal and provide an independent check', 'To avoid keeping records', 'To increase the number of transactions'], 1, 'Independent review improves the chance that discrepancies are detected.']
        ],
        mistakes: ['Assuming a written policy works without evidence that it was followed.', 'Posting an inventory adjustment before investigating the difference.'],
        summary: ['Match each control to a risk.', 'Retain evidence that links transactions to reports.', 'Independently review exceptions and update controls over time.'],
        cheatSheet: ['Authorization + custody + records + review', 'Trace source → journal → ledger → statements', 'Document and investigate exceptions']
      },
      {
        title: 'Ethical reporting', unit: 'Analysis & Controls',
        goals: ['Apply integrity and objectivity to reporting choices', 'Recognize how estimates can bias reported results', 'Respond appropriately to pressure to misstate information'],
        vocabulary: [['Faithful representation', 'Reporting that reflects the substance of transactions completely, neutrally, and without material error.'], ['Bias', 'A systematic influence that favors a desired result over an evidence-based estimate or treatment.'], ['Material information', 'Information whose omission or misstatement could reasonably affect users’ decisions.']],
        sections: [
          ['Report substance, not a desired target', 'Financial reporting exists to help users make decisions. Choosing a date, estimate, or classification solely to meet a target can make a report misleading even if the arithmetic is correct. Use the underlying transaction and applicable reporting rules.'],
          ['Estimates require evidence', 'Depreciation lives, residual values, inventory counts, and allowance estimates involve judgment. Use reasonable support, apply the method consistently, explain significant changes, and do not choose assumptions just to inflate income or assets.'],
          ['Protect users and records', 'Correct known errors through documented entries and appropriate approval. Preserve source evidence, disclose material information through proper channels, and do not conceal liabilities or alter records. Escalate unresolved pressure to a responsible reviewer while respecting confidentiality.']
        ],
        examples: [{
          prompt: 'A manager asks the accountant to overstate inventory so the business appears more profitable. What should the accountant do?',
          steps: ['Inventory must be supported by quantity, ownership, and an appropriate cost basis.', 'An unsupported increase can overstate assets and understate cost of goods sold, misleading users.', 'Do not make the entry. Preserve evidence, explain the reporting issue, and escalate through an authorized channel.'],
          answer: 'Refuse the unsupported adjustment and report the concern through documented, authorized channels.'
        }],
        questions: [
          ['Which estimate is most ethically supportable?', ['A residual value chosen to hit a profit target', 'A useful life supported by expected use and reviewed consistently', 'An inventory count copied from last year without verification', 'A liability omitted because payment is delayed'], 1, 'An estimate should have reasonable evidence and be applied consistently, not chosen for a desired result.'],
          ['A known error affects a report already prepared. What is the best response?', ['Destroy the supporting records', 'Document and escalate it for appropriate correction or disclosure', 'Offset it with an unrelated entry', 'Keep quiet if totals still balance'], 1, 'Errors should be handled transparently through the proper review process.']
        ],
        mistakes: ['Assuming an entry is acceptable because it balances.', 'Using estimates to target a desired result rather than represent evidence.', 'Concealing known errors or liabilities.'],
        summary: ['Use evidence, neutral judgment, and consistent methods.', 'Do not manipulate estimates or omit material information to meet targets.', 'Correct and escalate known misstatements through proper channels.'],
        cheatSheet: ['Substance and evidence before target', 'Document estimates and changes', 'Never conceal a known material error']
      }
    ]
  };

  for (const [courseId, specs] of Object.entries(lessonsByCourse)) {
    const course = window.STUDYBC_DATA?.courses.find(item => item.id === courseId);
    if (!course) {
      console.error(`StudyBC could not add authored accounting lessons: course ${courseId} is missing.`);
      continue;
    }

    specs.forEach((spec, lessonIndex) => {
      const lessonId = `${courseId}-authored-${String(lessonIndex + 1).padStart(2, '0')}`;
      const lesson = {
        id: lessonId,
        title: spec.title,
        unit: spec.unit,
        subunit: spec.unit,
        published: true,
        time: '25 min',
        source: { name: 'StudyBC original lesson', curriculum: curriculumUrl },
        goals: spec.goals,
        vocabulary: spec.vocabulary.map(([term, definition]) => ({ term, definition })),
        sections: spec.sections.map(([heading, content]) => ({ heading, content })),
        examples: spec.examples,
        mistakes: spec.mistakes,
        interactive: { type: 'reflection', label: 'Explain the accounting treatment and evidence in your own words.' },
        practice: spec.questions.map(([question, options, correct, explanation], questionIndex) => ({
          id: `${lessonId}-practice-${questionIndex + 1}`,
          type: 'multiple-choice',
          question,
          options,
          answer: options[correct],
          explanation
        })),
        summary: spec.summary,
        cheatSheet: spec.cheatSheet
      };

      const mappedIndex = course.lessons.findIndex(existing =>
        existing.published === false &&
        existing.unit === spec.unit &&
        existing.title.toLowerCase() === spec.title.toLowerCase()
      );
      if (mappedIndex >= 0) {
        lesson.id = course.lessons[mappedIndex].id;
        lesson.subunit = course.lessons[mappedIndex].subunit || spec.unit;
        course.lessons[mappedIndex] = lesson;
        return;
      }

      const duplicate = course.lessons.some(existing =>
        existing.published !== false &&
        existing.unit === spec.unit &&
        existing.title.toLowerCase() === spec.title.toLowerCase()
      );
      if (!duplicate) course.lessons.push(lesson);
    });

    course.units = course.units.map(unit => ({
      ...unit,
      lessons: course.lessons.filter(lesson => lesson.unit === unit.name).length
    }));
    console.info(`Added authored Accounting ${course.grade} lessons to ${course.title}.`);
  }
})();
