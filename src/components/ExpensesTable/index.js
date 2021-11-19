import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, sendExpenseId } from '../../actions';

class ExpensesTable extends React.Component {
  onClickEditExpense(expenseId) {
    const { sendExpenseIdProps } = this.props;
    sendExpenseIdProps(expenseId.toString());
  }

  onClickRemoveExpense(expenseId) {
    const { removeExpenseProps } = this.props;
    removeExpenseProps(expenseId);
  }

  render() {
    const { expenses } = this.props;
    const decimal = 10;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.length > 0
            && expenses.map((expense) => {
              const value = parseFloat(expense.value).toFixed(2, decimal);
              const name = expense.exchangeRates[expense.currency].name
                .replace('/Real Brasileiro', '');
              const ask = parseFloat(expense.exchangeRates[expense.currency].ask)
                .toFixed(2, decimal);
              const convertedValue = (value * ask).toFixed(2, decimal);
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>
                    R$
                    {' '}
                    {value}
                  </td>
                  <td>{name}</td>
                  <td>
                    R$
                    {' '}
                    {ask}
                  </td>
                  <td>
                    R$
                    {' '}
                    {convertedValue}
                  </td>
                  <td>Real</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={ () => this.onClickEditExpense(expense.id) }
                        data-testid="edit-btn"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={ () => this.onClickRemoveExpense(expense.id) }
                        data-testid="delete-btn"
                      >
                        Deletar

                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseProps: (expenseId) => dispatch(removeExpense(expenseId)),
  sendExpenseIdProps: (expenseId) => dispatch(sendExpenseId(expenseId)),
});

ExpensesTable.propTypes = {
  sendExpenseIdProps: PropTypes.func.isRequired,
  removeExpenseProps: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
